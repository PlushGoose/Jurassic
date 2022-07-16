function Jurassic_Game (width, height, background, background_image) {
    'use strict';

	var d = document;

	var cnv = d.createElement('canvas');
	cnv.style.position = 'fixed';
	cnv.style.left = 0;
	cnv.style.top = 0;
	cnv.width = width;
	cnv.height = height;
	cnv.style.backgroundColor = background;
	d.body.appendChild(cnv);

	if (background_image) {
		cnv.style.background = 'url('+background_image+') no-repeat';
		cnv.style.backgroundPosition = 'center';
		cnv.style.backgroundSize = 'cover';
	};

	var ctx = cnv.getContext('2d');

  var nextgamestep = (function () {
  return requestAnimationFrame ||
  webkitRequestAnimationFrame ||
  mozRequestAnimationFrame ||
  oRequestAnimationFrame ||
  mozRequestAnimationFrame ||
  function (callback) {
  setTimeout(callback, 1000 / 60);
  };
  }) ();


  var gameengine;
  var cycles = {};
  this.createCycle = function(value, Construct) {
    cycles[value] = Construct;
  };

  this.startCycle = function (value) {
  gameengine = cycles[value];
  gameenginestep();
  };

  this.setCycle = function (value) {
  gameengine = cycles[value];
  gameenginestep();
  };

  var gameenginestep = function () {
  ctx.clearRect(0, 0, cnv.width, cnv.height);
  gameengine();
  nextgamestep(gameenginestep);
  };

	this.Rect = function (p) {
      this.x = p.x;
      this.y = p.y;
      this.width = p.width;
      this.height = p.height;
      this.color = p.color;
      this.opacity = p.opacity;
      this.invisible = p.invisible;
      this.clickable = false;
	};

	var drawRect = function (x, y, w, h, c, o) {
    ctx.fillStyle = c;
    ctx.globalAlpha = o;
		ctx.fillRect(x - game.camera.x, y - game.camera.y, w, h); 
	};


    this.Rect.prototype = {
    	draw : function () {
    	this.clickable = true;
    	if (this.color && !this.invisible)	
    		drawRect(this.x, this.y, this.width, this.height, this.color, this.opacity);
      if (!this.opacity)
        this.opacity = 1;
    	},

    	intersect : function (obj) {

    		return !(this.x + this.width < obj.x || this.y + this.height < obj.y || this.x > obj.x + obj.width || this.y > obj.y + obj.height);
    	},

      move : function (x, y) {
        this.x += x;
        this.y += y;
      },

      setPosition : function(x, y) {
      	this.x = x;
      	this.y = y;
      }, 

      inCamera : function () {
        return (this.x - game.camera.x) + this.width > 0 && (this.x - game.camera.x) < cnv.width && (this.y - game.camera.y) + this.height > 0 && (this.y - game.camera.y) < cnv.height;
      },

    };

this.Text = function (p) {
      this.text = p.text;
      this.x = p.x;
      this.y = p.y;
      this.font = p.font;
      this.color = p.color;
      this.opacity = p.opacity;
      this.invisible = p.invisible;
  };

  var drawText = function (text, x, y, f, c, o) {
    ctx.fillStyle = c;
    ctx.globalAlpha = o;
    ctx.fillText(text, x - game.camera.x, y - game.camera.y);
    ctx.font = f;
  };


    this.Text.prototype = {
      draw : function () {
        
      if (!this.opacity)
           this.opacity = 1;
      if (this.color && !this.invisible) 
        drawText(this.text, this.x, this.y, this.font, this.color, this.opacity);
      },

      //intersect : function (obj) {
      //  return !(this.x + this.width < obj.x || this.y + this.height < obj.y || this.x > obj.x + obj.width || this.y > obj.y + obj.height);
      //},

      move : function (x, y) {
        this.x += x;
        this.y += y;
      },

      setPosition : function(x, y) {
      	this.x = x;
      	this.y = y;
      },

      inCamera : function () {
        return (this.x - game.camera.x) + this.width > 0 && (this.x - game.camera.x) < cnv.width && (this.y - game.camera.y) + this.height > 0 && (this.y - game.camera.y) < cnv.height;
      },

    };


this.Cyrcle = function (p) {
      this.x = p.x;
      this.y = p.y;
      this.radius = p.radius;
      this.color = p.color;
      this.width = 2*p.radius;
      this.height = 2*p.radius;
      this.opacity = p.opacity;
      this.invisible = p.invisible;
      this.clickable = false;
  };

  var drawCyrcle = function (x, y, r, c, o) {
    ctx.beginPath();
    ctx.arc(x - game.camera.x, y - game.camera.y, r, 0, Math.PI*2, false);
    ctx.fillStyle = c;
    ctx.globalAlpha = o;
    ctx.closePath();
    ctx.fill();
  };


    this.Cyrcle.prototype = {
      draw : function () {
      this.clickable = true;
      if (this.color && !this.invisible) 
        drawCyrcle(this.x + this.radius, this.y + this.radius, this.radius, this.color, this.opacity);
      if (!this.opacity)
        this.opacity = 1;
      
      },

      intersect : function (obj) {
        return !(this.x + this.width < obj.x || this.y + this.height < obj.y || this.x > obj.x + obj.width || this.y > obj.y + obj.height);
      },

      move : function (x, y) {
        this.x += x;
        this.y += y;
      },

      setPosition : function(x, y) {
      	this.x = x;
      	this.y = y;
      },

      inCamera : function () {
        return (this.x - game.camera.x) + this.width > 0 && (this.x - game.camera.x) < cnv.width && (this.y - game.camera.y) + this.height > 0 && (this.y - game.camera.y) < cnv.height;
      },

    };

this.Image = function (p) {
      this.x = p.x;
      this.y = p.y;
      this.width = p.width;
      this.height = p.height;
      this.file = p.file;
      this.img = new Image();
      this.img.src = this.file;
      this.opacity = p.opacity;
      this.invisible = p.invisible;
      this.clickable = false;
  };

   var drawImg = function (x, y, width, height, Image, o) {
    ctx.globalAlpha = o;
    ctx.drawImage(Image, x - game.camera.x, y - game.camera.y, width, height);
   };


    this.Image.prototype = {
      draw : function () {
      this.clickable = true;
      if (this.file && !this.invisible) 
        drawImg(this.x, this.y, this.width, this.height, this.img, this.opacity);
      if (!this.opacity)
        this.opacity = 1;
      },

      intersect : function (obj) {
        return !(this.x + this.width < obj.x || this.y + this.height < obj.y || this.x > obj.x + obj.width || this.y > obj.y + obj.height);
      },

      move : function (x, y) {
        this.x += x;
        this.y += y;
      },

      setPosition : function(x, y) {
      	this.x = x;
      	this.y = y;
      },

      inCamera : function () {
        return (this.x - game.camera.x) + this.width > 0 && (this.x - game.camera.x) < cnv.width && (this.y - game.camera.y) + this.height > 0 && (this.y - game.camera.y) < cnv.height;
      },

    };
   
this.AnimatedImage = function (p) {
    this.x = p.x;
    this.y = p.y,
    this.width = p.width;
    this.height = p.height;
    this.rendering_x = p.rendering_x;
    this.rendering_y = p.rendering_y;
    this.rendering_width = p.rendering_width;
    this.rendering_height = p.rendering_height;
    this.file = p.file;
    this.shift = p.shift;
    this.time = p.time;
    this.quantity_of_times = p.quantity_of_times;
    this.img = new Image();
    this.img.src = p.file;
    this.opacity = p.opacity;
    this.delay = p.delay;
    this.invisible = p.invisible;
    this.pause = p.pause;
    this.i = 0;
    this.clickable = false;
  };

   var drawAnimImg = function (rendering_x, rendering_y, rendering_width, rendering_height, x, y, width, height, Img, time, shift, o) {
    ctx.globalAlpha = o;
    ctx.drawImage(Img, rendering_x + shift*time, rendering_y, rendering_width, rendering_height, x - game.camera.x, y - game.camera.y, width, height); 
   };



    this.AnimatedImage.prototype = {
      draw : function () {
        this.clickable = true;
      if (this.file && !this.invisible) 
        drawAnimImg(this.rendering_x, this.rendering_y, this.rendering_width, this.rendering_height, this.x, this.y, this.width, this.height, this.img, this.time, this.shift, this.opacity);
           if (this.delay && this.delay > 0) {
           this.i++;

          if (this.i > this.delay) {
            if (!this.pause)
            this.time++;
            this.i = 0;
            };
            } else if (!this.pause) {this.time++};

        if (this.time >= this.quantity_of_times)
          this.time = 0;
        if (!this.opacity)
          this.opacity = 1;
        if (!this.rendering_x)
          this.rendering_x = 0;
        if (!this.rendering_y)
          this.rendering_y = 0;
      },

      intersect : function (obj) {
        return !(this.x + this.width < obj.x || this.y + this.height < obj.y || this.x > obj.x + obj.width || this.y > obj.y + obj.height);
      },

      move : function (x, y) {
        this.x += x;
        this.y += y;
      },

      setPosition : function() {
      	this.x = x;
      	this.y = y;
      },

      inCamera : function () {
        return (this.x - game.camera.x) + this.width > 0 && (this.x - game.camera.x) < cnv.width && (this.y - game.camera.y) + this.height > 0 && (this.y - game.camera.y) < cnv.height;
      },

    };

var keyboardInited = false;
this.keyboard = function () {
    if (keyboardInited) return;
    keyboardInited = true;

    var keys = {
      		'LEFT': 37,
			'RIGHT': 39,
			'UP': 38,
			'DOWN': 40,
			'SPACE': 32,
			'CTRL': 17,
			'SHIFT': 16,
			'ALT': 18,
			'ESC': 27,
			'ENTER': 13,
			'MINUS': 189,
			'PLUS': 187,
			'CAPS_LOCK': 20,
			'BACKSPACE': 8,
			'TAB': 9,
			'Q': 81,
			'W': 87,
			'E': 69,
			'R': 82,
			'T': 84,
			'Y': 89,
			'U': 85,
			'I': 73,
			'O': 79,
			'P': 80,
			'A': 65,
			'S': 83,
			'D': 68,
			'F': 70,
			'G': 71,
			'H': 72,
			'J': 74,
			'K': 75,
			'L': 76,
			'Z': 90,
			'X': 88,
			'V': 86,
			'B': 66,
			'N': 78,
			'M': 77,
			'0': 48,
			'1': 49,
			'2': 50,
			'3': 51,
			'4': 52,
			'5': 53,
			'6': 54,
			'7': 55,
			'8': 56,
			'C': 67,
			'9': 57,
			'F1': 112,
			'F2': 113,
			'F3': 114,
			'F4': 115,
			'F5': 116,
			'F6': 117,
			'F7': 118,
			'F8': 119,
			'F9': 120,
			'F10': 121,
			'F11': 122,
			'F12': 123


    };

    var pressedKeys = {};

    var pressedKeys2 = {};

    window.addEventListener('keydown', function (e) {
    	pressedKeys[e.keyCode] = true;
    });

    window.addEventListener('keyup', function (e) {
    	pressedKeys[e.keyCode] = false;
      pressedKeys2[e.keyCode] = true;
      setTimeout(function () {pressedKeys2[e.which] = false;}, 18);
    });

    var keyboard = {
    	down : function (keyName) {
    		return !!pressedKeys[keys[keyName]];
    	},

      press : function (keyName) {
        return !!pressedKeys2[keys[keyName]];
      },

    };


    return keyboard;
};


this.camera = {
x : 0,
y : 0,

move : function (x, y) {
this.x += x;
this.y += y;
}

};


this.loadAudio = function (arr, vol) {

var audio = document.createElement('audio');
for (var i = 0, len = arr.length; i < len; i++) {
var source = document.createElement('source');
source.src = arr[i];
audio.appendChild(source);
};

audio.volume = 1 || vol;

var o = {
dom : false,
state : 'stop',

play : function () {
this.dom.currentTime = 0;
this.dom.play();
this.state = 'play';
},

pause : function () {
this.dom.pause();
this.state = 'pause';
},

stop : function () {
this.dom.pause();
this.dom.currentTime = 0;
this.state = 'stop';
},

setVolume : function (vol) {
this.dom.volume = vol;
}

};

o.dom = audio;

return o;
};

this.random = function (min, max) {
return Math.floor(Math.random() * (max - min)) + min;
};


this.mouse = function () {

var buttons = {
'LEFT' : 1,
'MIDDLE' : 2,
'RIGHT' : 3,
};

var mouse = {
x : 0,
y : 0
};

var pressedbuttons = {};

var pressedbuttons2 = {};


window.addEventListener('mousedown', function (e) {
pressedbuttons[e.which] = true;
});

window.addEventListener('mouseup', function (e) {
pressedbuttons[e.which] = false;
pressedbuttons2[e.which] = true;
setTimeout(function () {pressedbuttons2[e.which] = false;}, 18);
});

function cursor (event) {
mouse.x = event.pageX;
mouse.y = event.pageY;
};


window.addEventListener('mousemove', cursor);

var m = {
inObject : function (obj) {
  return obj.clickable && mouse.x > (obj.x - game.camera.x) && mouse.x < (obj.x - game.camera.x) + obj.width && mouse.y > (obj.y - game.camera.y) && mouse.y < (obj.y - game.camera.y) + obj.height;
},

holdObject : function (button, obj) {
  return obj.clickable && (mouse.x > (obj.x - game.camera.x) && mouse.x < (obj.x - game.camera.x) + obj.width && mouse.y > (obj.y - game.camera.y) && mouse.y < (obj.y - game.camera.y) + obj.height) && pressedbuttons[buttons[button]];
},

clickObject : function (button, obj) {
  return obj.clickable && (mouse.x > (obj.x - game.camera.x) && mouse.x < (obj.x - game.camera.x) + obj.width && mouse.y > (obj.y - game.camera.y) && mouse.y < (obj.y - game.camera.y) + obj.height) && pressedbuttons2[buttons[button]];
},

holdScreen : function (button) {
  return pressedbuttons[buttons[button]];
},

clickScreen : function (button) {
  return pressedbuttons2[buttons[button]];
},

takeCoordinatesX : function (obj) {
  obj.x = mouse.x;
},

takeCoordinatesY : function (obj) {
  obj.y = mouse.y;
},
getMouseX : function () {
  return mouse.x;
},
getMouseY : function () {
  return mouse.y;
}

}; 


return m;

};

this.setCursorImage = function (file) {
cnv.style.cursor = 'url('+file+'), auto';
};

this.hideCursor = function () {
cnv.style.cursor = 'none';
};

this.randomBetweenTwoValues = function (num1, num2) {
var rand = Math.floor(Math.random() * 2);
var nums = [num1, num2];
return nums[rand];
};

this.randomWithFloats = function (min, max) {
return Math.random() * (max - min) + min;
};

this.touch = function () {

var touch = {
x : 0,
y : 0
};

var pressedtouch = 0;
var pressedtouch2 = 0;
var heldtouch = 0;

window.addEventListener('touchstart', function (e) {
pressedtouch = 1;
touch.x = e.touches[0].clientX;
touch.y = e.touches[0].clientY;
});

window.addEventListener('touchend', function (e) {
pressedtouch = 0;
pressedtouch2 = 1;
setTimeout(function () {pressedtouch2 = 0}, 18);
});

window.addEventListener('touchmove', function (e) {
heldtouch = 1;
setTimeout(function () {heldtouch = 0}, 32);
});

var t = {
holdScreen : function () {return pressedtouch == 1},
clickScreen : function () {return pressedtouch2 == 1},
clickObject : function (obj) {return obj.clickable && pressedtouch2 == 1 && (touch.x > (obj.x - game.camera.x) && touch.x < (obj.x - game.camera.x) + obj.width && touch.y > (obj.y - game.camera.y) && touch.y < (obj.y - game.camera.y) + obj.height)},
holdObject : function (obj) {return obj.clickable && pressedtouch == 1 && (touch.x > (obj.x - game.camera.x) && touch.x < (obj.x - game.camera.x) + obj.width && touch.y > (obj.y - game.camera.y) && touch.y < (obj.y - game.camera.y) + obj.height)},
heldScreen : function () {return heldtouch == 1},
heldObject : function (obj) {return obj.clickable && heldtouch == 1 && (touch.x > (obj.x - game.camera.x) && touch.x < (obj.x - game.camera.x) + obj.width && touch.y > (obj.y - game.camera.y) && touch.y < (obj.y - game.camera.y) + obj.height)},
};

return t;
};

this.drawText = function (x, y, t, c, f, o) {
ctx.fillStyle = c;
ctx.globalAlpha = o;
ctx.fillText(t, x - game.camera.x, y - game.camera.y);
ctx.font = f;
if (o === undefined)
o = 1;
};

this.setFullScreen = function () {
cnv.width = screen.width;
cnv.height = screen.height;
};

this.canvasWidth = function () {
return cnv.width;
};

this.canvasHeight = function () {
return cnv.height;
};

this.drawRect = function (x, y, w, h, c, o) {
ctx.fillStyle = c;
ctx.globalAlpha = o;
ctx.fillRect(x - game.camera.x, y - game.camera.y, w, h);
if (o === undefined)
o = 1;
};

this.drawCyrcle = function (x, y, r, c, o) {
ctx.beginPath();
ctx.arc(x - game.camera.x, y - game.camera.y, r, 0, Math.PI*2, false);
ctx.fillStyle = c;
ctx.globalAlpha = o;
ctx.closePath();
ctx.fill();
if (o === undefined)
o = 1;
};

this.drawImage = function (i, x, y, w, h, o) {
ctx.globalAlpha = o;
ctx.drawImage(i, x - game.camera.x, y - game.camera.y, w, h);
if (o === undefined)
o = 1;
};


this.moveByVector = function (obj, angle_of_vector, modul_of_vector) {
var radian = angle_of_vector * Math.PI / 180;
obj.move(Math.sin(radian) * modul_of_vector, -Math.cos(radian) * modul_of_vector);
}

this.movementWithAcceleration = function(obj, dx, dy, a) {
	this.obj = obj;
	this.dx = dx;
	this.dy = dy;
	this.a = a;
	this.tg = this.dx / this.dy;
	this.modul = Math.sqrt(Math.pow(this.dx, 2) + Math.pow(this.dy, 2));
};
this.movementWithAcceleration.prototype = {
	launch : function () {
		this.obj.move(this.tg / Math.sqrt(Math.pow(this.tg, 2) + 1)*this.modul, 1 / Math.sqrt(1 + Math.pow(this.tg, 2))*this.modul);
		this.modul += this.a;
		if (this.modul < 0)
			this.modul = 0;
	}
};

this.crowlToPoint = function (obj, x, y, speed) {
var X = x - obj.x;
var Y = y - obj.y;
if (speed <= 1)
obj.move(X*speed, Y*speed);
else console.log('The speed was exceeded');
};

this.intersectingBetweenCyrcles = function (circle1, circle2) {
return Math.sqrt(Math.pow((circle1.x + circle1.width / 2) - (circle2.x + circle1.width / 2), 2) + Math.pow((circle1.y + circle1.height / 2) - (circle2.y + circle1.height / 2), 2)) < circle1.radius + circle2.radius;
}

//obstacle unit
this.ObstacleUnit = function (p) {
	this.x = p.x;
	this.y = p.y;
	this.width = p.width;
	this.height = p.height;
	this.color = p.color;
	this.opacity = p.opacity;
	this.invisible = p.invisible;
	this.obstacles = [];
  this.clickable = false;
}

var drawUnit = function(x, y, w, h, c, o) {
	ctx.fillStyle = c;
	ctx.globalAlpha = o;
	ctx.fillRect(x - game.camera.x, y - game.camera.y, w, h);
}

this.ObstacleUnit.prototype = {
	draw : function () {
    this.clickable = true;
		if (this.color && !this.invisible)	
    		drawRect(this.x, this.y, this.width, this.height, this.color, this.opacity);
      if (!this.opacity)
        this.opacity = 1;
	},

	intersect : function (obj) {
    		return !(this.x + this.width < obj.x || this.y + this.height < obj.y || this.x > obj.x + obj.width || this.y > obj.y + obj.height);
    	},

      move : function (x, y) {
        ///
        for (var j = 0; j < this.obstacles.length; j++) {
        if (!(this.x + x > this.obstacles[j].x + this.obstacles[j].width || this.x + x + this.width < this.obstacles[j].x || this.y + y > this.obstacles[j].y + this.obstacles[j].height || this.y + y + this.height < this.obstacles[j].y)) {
          x = 0;
          y = 0;
        } 
      }
				///
        this.x += x;
        this.y += y;
      },

      setPosition : function(x, y) {
      	this.x = x;
      	this.y = y;
      }, 

      inCamera : function () {
        return (this.x - game.camera.x) + this.width > 0 && (this.x - game.camera.x) < cnv.width && (this.y - game.camera.y) + this.height > 0 && (this.y - game.camera.y) < cnv.height;
      },

      addObstacle : function (obj) {
      	this.obstacles.push(obj);
      },


};

this.Map = function (p) {
this.file = p.file;
this.width = p.width;
this.height = p.height;
this.line = p.line;
this.quantity_of_tiles_in_line = p.quantity_of_tiles_in_line;
this.tile_width = p.tile_width;
this.tile_height = p.tile_height;
this.pointOfRendering_x = p.pointOfRendering_x;
this.pointOfRendering_y = p.pointOfRendering_y;
this.number_of_tile_in_line = p.number_of_tile_in_line;
this.arrayOfSymbols = [];
this.arrayOfTiles = [];
this.Img = new Image();
this.Img.src = this.file;
};

this.Map.prototype = {
	setSymbols : function (array) {
		for (var i = 0; array.length != this.arrayOfSymbols.length; i++)
			this.arrayOfSymbols.push(array[i]);
	},
  setTiles : function (array) {
    for (var i = 0; array.length != this.arrayOfTiles.length; i++)
      this.arrayOfTiles.push(array[i]);
  },
	draw : function () {
		if (this.arrayOfSymbols.length <= this.quantity_of_tiles_in_line) {
			///
		for (var i = 0; i < this.arrayOfSymbols.length; i++)
			for (var y = 0; y < this.height; y++)
				for (var x = 0; x < this.width; x++)
					if (this.arrayOfTiles[y].charAt(x) == this.arrayOfSymbols[i])
			ctx.drawImage(this.Img, this.tile_width*(i + (this.number_of_tile_in_line-1)), (this.line-1)*this.tile_height, this.tile_width, this.tile_height, (this.pointOfRendering_x + this.tile_width*x) - game.camera.x, (this.pointOfRendering_y + this.tile_height*y) - game.camera.y, this.tile_width, this.tile_height);
			///
		}

			else {
				console.log('The quantity of tiles in line was exceeded');
			}
	},

};

// end of code
};
