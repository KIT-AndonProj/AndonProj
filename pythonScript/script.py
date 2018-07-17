# # import requests

# # username = 'crsherbet'

# # response = requests.post('http://localhost:5000/api/git/info', data ={'username': username}).json()

# # print(response)


import time
from neopixel import *
import argparse

# LED strip configuration:
LED_COUNT      = 2      # Number of LED pixels.
LED_PIN        = 18      # GPIO pin connected to the pixels (18 uses PWM!).
#LED_PIN        = 10      # GPIO pin connected to the pixels (10 uses SPI /dev/spidev0.0).
LED_FREQ_HZ    = 800000  # LED signal frequency in hertz (usually 800khz)
LED_DMA        = 10      # DMA channel to use for generating signal (try 10)
LED_BRIGHTNESS = 255     # Set to 0 for darkest and 255 for brightest
LED_INVERT     = False   # True to invert the signal (when using NPN transistor level shift)
LED_CHANNEL    = 0       # set to '1' for GPIOs 13, 19, 41, 45 or 53



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
    strip = Adafruit_NeoPixel(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL)
    strip.begin()
# g r b
    try:
        if args.overall:
            theaterChase(strip, Color(100-args.overall, args.overall + 20, 0), 60, 90)    
        elif args.bugspot:
            shine(strip, Color(255-(args.bugspot*10), args.bugspot*10 , 0), 10000)
        elif args.complexity:
            shine(strip, Color(255-(args.complexity*10), args.complexity*10, 0), 10000)
        elif args.duplication:
            shine(strip, Color(255-(args.duplication*10), args.duplication*10, 0), 10000)
        elif args.outdated:
            shine(strip, Color(255-(args.outdated*10), args.outdated*10 , 0), 10000)
        elif args.frequency:
            theaterChase(strip, Color(20,130,20), args.frequency, 60) 
        elif args.welcome:
            theaterChaseRainbow(strip, 30)
            theaterChase(strip, Color(127,127,127), 120, 45) 
        colorWipe(strip, Color(0,0,0), 10)

    except KeyboardInterrupt:
        if args.clear:
            colorWipe(strip, Color(0,0,0), 10)
