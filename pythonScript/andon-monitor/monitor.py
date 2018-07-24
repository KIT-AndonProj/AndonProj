import os
import time
from luma.core.virtual import terminal
from luma.core.interface.serial import i2c
from luma.oled.device import ssd1306
from PIL import ImageFont
import argparse



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

def gitInfo():
    for fontname, size in [("miscfs_.ttf", 12)]:
        font = make_font(fontname, size) if fontname else None
        term = terminal(device, font)
        term.println("    Andon Monitor")
        term.println("---------------------")
        term.println("Gitname : littlenune")
        term.println("Reponame : Andonproj")
        term.println("Created : 2018/07/23")
        term.puts("---------------------")
        # time.sleep(10)
        # term.clear()

def displayInfo(name,score):
    for fontname, size in [("miscfs_.ttf",12)]:
        font = make_font(fontname, size) if fontname else None
        term = terminal(device, font)
        term.println("    Andon Monitor")
        term.println("---------------------")
        term.println("%s score: %s" % (name,score))
        term.puts("---------------------")
        time.sleep(30)

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

    try:
        if args.overall:
            displayInfo("Overall Health",args.overall)
        elif args.bugspot:
            displayInfo("Bugspot Analyze",args.bugspot)
        elif args.complexity:
            displayInfo("Complexity",args.complexity)
        elif args.duplication:
            displayInfo("Duplication",args.duplication)
        elif args.outdated:
            displayInfo("Outdated",args.outdated)
        # elif args.frequency:
        #     frequencyInfo(args.frequency)
        elif args.welcome:
            welcome()
        
    except KeyboardInterrupt:
        if args.clear:
            pass
