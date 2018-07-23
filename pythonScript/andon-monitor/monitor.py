import os
import time
from demo_opts import get_device
from luma.core.virtual import terminal
from PIL import ImageFont


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
        time.sleep(10)
        term.clear()

def overallHealthInfo():
    for fontname, size in [("miscfs_.ttf", 12)]:
        font = make_font(fontname, size) if fontname else None
        term = terminal(device, font)
        term.println("    Andon Monitor")
        term.println("---------------------")
        term.println("Overallhealth : 50")
        term.puts("Code quality : Medium")
        time.sleep(10)
        term.clear()


def duplicateInfo():
    for fontname, size in [("miscfs_.ttf", 12)]:
        font = make_font(fontname, size) if fontname else None
        term = terminal(device, font)
        term.println("    Andon Monitor")
        term.println("---------------------")
        term.println("Duplicate score : 100")
        term.puts("Code quality : Low")
        time.sleep(10)
        term.clear()


def complexityInfo():
    for fontname, size in [("miscfs_.ttf", 12)]:
        font = make_font(fontname, size) if fontname else None
        term = terminal(device, font)
        term.println("    Andon Monitor")
        term.println("---------------------")
        term.println("Complexity score : 8")
        term.puts("Code quality : High")
        time.sleep(10)
        term.clear()


def outdatedInfo():
    for fontname, size in [("miscfs_.ttf", 12)]:
        font = make_font(fontname, size) if fontname else None
        term = terminal(device, font)
        term.println("    Andon Monitor")
        term.println("---------------------")
        term.println("Outdated score : 8")
        term.puts("Code quality : High")
        time.sleep(10)
        term.clear()


def bugspotInfo():
    for fontname, size in [("miscfs_.ttf", 12)]:
        font = make_font(fontname, size) if fontname else None
        term = terminal(device, font)
        term.println("    Andon Monitor")
        term.println("---------------------")
        term.println("Bugspot score : 8")
        term.puts("Code quality : High")
        time.sleep(10)
        term.clear()




if __name__ == "__main__":
    try:
        device = get_device()
        welcome()
        gitInfo()
        overallHealthInfo()
        duplicateInfo()
        bugspotInfo()
        outdatedInfo()
        
    except KeyboardInterrupt:
        pass
