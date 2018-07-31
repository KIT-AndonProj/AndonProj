import time
import os
import socket
from luma.core.virtual import terminal
from luma.core.interface.serial import i2c
from luma.oled.device import ssd1306
from PIL import ImageFont


def make_font(name, size):
    font_path = os.path.abspath(os.path.join(
        os.path.dirname(__file__), 'fonts', name))
    return ImageFont.truetype(font_path, size)

def get_ip_address():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("8.8.8.8", 80))
    ip =  s.getsockname()[0]
    s.close()
    return ip

def sys_info():
    while True:
        for fontname, size in [("miscfs_.ttf",12)]:
            font = make_font(fontname, size) if fontname else None
            term = terminal(device, font)
            term.println("    Andon Monitor")
            term.println("---------------------")
            term.println("IP : %s" % (get_ip_address()))
            term.puts("---------------------")
            time.sleep(10)

if __name__ == "__main__":
    serial = i2c(port=1, address=0x3C)
    device = ssd1306(serial)
    try:
        sys_info()
    except KeyboardInterrupt:
        pass