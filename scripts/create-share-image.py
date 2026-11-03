from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
root = Path(__file__).resolve().parent.parent
assets = root / 'public'
image = Image.new('RGB', (1200, 630), 'white')
draw = ImageDraw.Draw(image)
regular = lambda size: ImageFont.truetype(str(assets / 'jetbrains-regular.ttf'), size)
bold = lambda size: ImageFont.truetype(str(assets / 'jetbrains-bold.ttf'), size)
draw.text((80, 65), 'Vote for Johnny!', font=bold(28), fill='#111111')
draw.text((80, 160), 'Hi Matcha, I’m Johnny.', font=bold(48), fill='#111111')
draw.rounded_rectangle((80, 280, 1120, 470), radius=18, fill='#22c55e')
draw.text((110, 299), 'React, TypeScript, and ChatGPT', font=regular(24), fill='white')
draw.rounded_rectangle((85, 344, 1115, 465), radius=13, fill='white')
draw.text((110, 378), 'I love getting the pixels right', font=regular(27), fill='#111111')
draw.text((80, 535), 'Frontend engineer · Salem, Massachusetts', font=regular(23), fill='#4b5563')
image.save(assets / 'social-v2.png', optimize=True)
