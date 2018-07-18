import time
import Adafruit_GPIO.SPI as SPI
import Adafruit_SSD1306

from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont

import subprocess

RST = None
DC = 23
SPI_PORT = 0
SPI_DEVICE = 0

disp = Adafruit_SSD1306.SSD1306_128_64(rst=RST)

disp.begin()
disp.clear()
disp.display()

width = disp.width
height = disp.height
image = Image.new('1',(width,height))

draw = ImageDraw.Draw(image)

draw.rectangle((0,0,width,height),outline=0,fill=0)

padding = -2
top = padding
bottom = height-padding
x = 0

font = ImageFont.truetype('04B_30__.TTF', 16)

while True:
    draw.rectangle((0,0,width,height),outline=0,fill=0)
    draw.text((x,top+8)," WELCOME",font=font,fill=255)
    draw.text((x,top+24),"    TO",font=font,fill=255)
    draw.text((x,top+40)," ANDON :)",font=font,fill=255)

    disp.image(image)
    disp.display()
    time.sleep(.1)