import time
from neopixel import *
import argparse
import os
from luma.core.virtual import terminal
from luma.core.interface.serial import i2c
from luma.oled.device import ssd1306
from PIL import ImageFont
import multiprocessing as mp

# LED strip configuration:
LED_COUNT      = 2      # Number of LED pixels.
LED_PIN        = 19      # GPIO pin connected to the pixels (18 uses PWM!).
#LED_PIN        = 10      # GPIO pin connected to the pixels (10 uses SPI /dev/spidev0.0).
LED_FREQ_HZ    = 800000  # LED signal frequency in hertz (usually 800khz)
LED_DMA        = 10      # DMA channel to use for generating signal (try 10)
LED_BRIGHTNESS = 255     # Set to 0 for darkest and 255 for brightest
LED_INVERT     = False   # True to invert the signal (when using NPN transistor level shift)
LED_CHANNEL    = 1       # set to '1' for GPIOs 13, 19, 41, 45 or 53

def make_font(name, size):
    font_path = os.path.abspath(os.path.join(
        os.path.dirname(__file__), 'fonts', name))
    return ImageFont.truetype(font_path, size)

def welcome():
     while True:
        for fontname, size in [("miscfs_.ttf", 16)]:
            font = make_font(fontname, size) if fontname else None
            term = terminal(device, font)
            term.println("    Welcome")
            term.println("      To")
            term.puts("  Andon Monitor")
            time.sleep(3)
            term.clear()

def displayInfo(name,score):
    for fontname, size in [("miscfs_.ttf",12)]:
        font = make_font(fontname, size) if fontname else None
        term = terminal(device, font)
        term.println("    Andon Monitor")
        term.println("---------------------")
        term.println("%s: %s" % (name,score))
        term.puts("---------------------")
        time.sleep(30)

# Define functions which animate LEDs in various ways.

def shine(strip, color, wait_ms=50):
    strip.setPixelColor(0, color)
    strip.setPixelColor(1, color)
    strip.show()
    time.sleep(wait_ms/1000.0)

def colorWipe(strip, color, wait_ms=50):
    """Wipe color across display a pixel at a time."""
    for i in range(strip.numPixels()):
        strip.setPixelColor(i, color)
        strip.show()
        time.sleep(wait_ms/1000.0)

def theaterChase(strip, color, wait_ms=50, iterations=10):
    """Movie theater light style chaser animation."""
    for j in range(iterations):
        for q in range(3):
            for i in range(0, strip.numPixels(), 3):
                strip.setPixelColor(i+q, color)
            strip.show()
            time.sleep(wait_ms/1000.0)
            for i in range(0, strip.numPixels(), 3):
                strip.setPixelColor(i+q, 0)

def wheel(pos):
    """Generate rainbow colors across 0-255 positions."""
    if pos < 85:
        return Color(pos * 3, 255 - pos * 3, 0)
    elif pos < 170:
        pos -= 85
        return Color(255 - pos * 3, 0, pos * 3)
    else:
        pos -= 170
        return Color(0, pos * 3, 255 - pos * 3)

def rainbow(strip, wait_ms=20, iterations=1):
    """Draw rainbow that fades across all pixels at once."""
    for j in range(256*iterations):
        for i in range(strip.numPixels()):
            strip.setPixelColor(i, wheel((i+j) & 255))
        strip.show()
        time.sleep(wait_ms/1000.0)

def rainbowCycle(strip, wait_ms=20, iterations=5):
    """Draw rainbow that uniformly distributes itself across all pixels."""
    for j in range(256*iterations):
        for i in range(strip.numPixels()):
            strip.setPixelColor(i, wheel((int(i * 256 / strip.numPixels()) + j) & 255))
        strip.show()
        time.sleep(wait_ms/1000.0)

def theaterChaseRainbow(strip, wait_ms=50):
    """Rainbow movie theater light style chaser animation."""
    for j in range(256):
        for q in range(3):
            for i in range(0, strip.numPixels(), 3):
                strip.setPixelColor(i+q, wheel((i+j) % 255))
            strip.show()
            time.sleep(wait_ms/1000.0)
            for i in range(0, strip.numPixels(), 3):
                strip.setPixelColor(i+q, 0)

# Main program logic follows:
if __name__ == '__main__':

    parser = argparse.ArgumentParser()
    parser.add_argument('-c', '--clear', action='store_true', help='clear the display on exit')
    parser.add_argument('-wel', '--welcome', action='store_true', help='welcome light')
    parser.add_argument('-ol', '--overall', type=int ,help='overall health value')
    parser.add_argument('-bug','--bugspot', type=int ,help='bugspot value')
    parser.add_argument('-comp', '--complexity', type=int ,help='complexity value')
    parser.add_argument('-dup', '--duplication',type=int ,help='duplication value')
    parser.add_argument('-od','--outdated', type=int ,help='outdated value')
    parser.add_argument('-fq', '--frequency',type=int ,help='frequency of commits value')

    args = parser.parse_args()
    serial = i2c(port=1, address=0x3C)
    device = ssd1306(serial)
#
    strip = Adafruit_NeoPixel(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL)
    strip.begin()

    try:
        if not str(args.overall) == 'None':
            p = mp.Process(target=displayInfo, args=("Overall Health score",args.overall))
            p.start()
            if args.overall > 80:
                theaterChase(strip, Color(100 - args.overall, args.overall + 20, 0), 175 - args.overall, 150)    
            else:
                shine(strip, Color(255 - (args.overall * 3), args.overall * 3 , 0), 20000)
        elif not str(args.bugspot) == 'None':
            p = mp.Process(target=displayInfo, args=("Bugspot Analyze score",args.bugspot))
            p.start()
            if args.bugspot > 20:
                theaterChase(strip, Color(100 - (args.bugspot * 4), (args.bugspot * 4) + 20, 0), 100 - args.bugspot, 150)   
            else:
                shine(strip, Color(255-(args.bugspot * 10), args.bugspot * 10 , 0), 20000)
        elif not str(args.complexity) == 'None':
            p = mp.Process(target=displayInfo, args=("Complexity score",args.complexity))
            p.start()
            if args.complexity > 20:
                theaterChase(strip, Color(100 - (args.complexity * 4), (args.complexity * 4) + 20, 0), 100 - args.complexity, 150)   
            else:
                shine(strip, Color(255 - (args.complexity * 10), args.complexity * 10, 0), 20000)
        elif not str(args.duplication) == 'None':
            p = mp.Process(target=displayInfo, args=("Duplication score",args.duplication))
            p.start()
            if args.duplication > 20:
                theaterChase(strip, Color(100 - (args.duplication * 4), (args.duplication * 4) + 20, 0), 100 - args.duplication, 150)   
            else:
                shine(strip, Color(255 - (args.duplication * 10), args.duplication * 10, 0), 20000)
        elif not str(args.outdated) == 'None':
            p = mp.Process(target=displayInfo, args=("Outdated score",args.outdated))
            p.start() 
            if args.outdated > 20:
                theaterChase(strip, Color(100 - (args.outdated * 4), (args.outdated * 4) + 20, 0), 100 - args.outdated, 150)   
            else:
                shine(strip, Color(255 - (args.outdated * 10), args.outdated * 10 , 0), 20000)
        elif not str(args.frequency) == 'None':
            p = mp.Process(target=displayInfo, args=("Average of commits",args.frequency))
            p.start()
            if args.frequency < 100:
                theaterChase(strip, Color(20, 127, 0), args.frequency, 60) 
            elif args.frequency < 200:
                theaterChase(strip, Color(50, 127, 0), args.frequency, 60) 
            else:
                theaterChase(strip, Color(175, 40, 130), args.frequency, 60) 
        elif args.welcome:
            p = mp.Process(target=welcome)
            p.start()
            theaterChaseRainbow(strip, 30)

        colorWipe(strip, Color(0,0,0), 10)
        p.terminate()

    except KeyboardInterrupt:
        if args.clear:
            colorWipe(strip, Color(0,0,0), 10)
