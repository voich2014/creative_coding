/*

	ここで実装するJavaScriptのクラスや関数はぼいちが個人的に
	利用する	目的で移植したものなので、汎用的なライブラリ
	を意識したものでは無いため、ご利用は自己責任でお願いします。
	
	vl_common_v1.4.0.js
	
	Copyright (c) 2020 ぼいち(@voich2014 in Twitter)
	
	Released under the MIT license.
 	see https://opensource.org/licenses/MIT
 	Where a citation is listed, please also check the license of the citing source.

*/

// 自前ライブラリ群

function rad(deg)
{
	//度→ラジアン変換
	return deg * Math.PI / 180;
}

function rnd(x)
{
	//乱数取得
	return Math.floor(Math.random() * x);
}

function max(a,b)
{
	//大きい方を返す
	return Math.max(a,b);
}

function min(a,b)
{
	//小さい方を返す
	return Math.min(a,b);
}

function lerpColor(col1,col2,x)
{
	let c = 
	{
		r: col1.r + x * (col2.r -col1.r),
		g: col1.g + x * (col2.g -col1.g),
		b: col1.b + x * (col2.b -col1.b),
	};
	return c;
}

function lerpHSL(col1,col2,a)
{
	//h,s,lは0.0～1.0
		
	const aa  = 1.0 - a;
	const col =
	{
		h: SL.clamp(col1.h * aa + col2.h * a,0.0,1.0),
		s: SL.clamp(col1.s * aa + col2.s * a,0.0,1.0),
		l: SL.clamp(col1.l * aa + col2.l * a,0.0,1.0)
	};
	
	return col;
}

function hsl2rgb(h,s,l)
{
	//HSLからRGBに変換
	//
	//  h(hue)       : 色相  0-359の値[度]
	//  s(saturation): 彩度  0-1.0の値[%]
	//  l(lightness) : 明度  0-1.0の値[%]
	//
	let max,min;
	let r,g,b;
	
	//念のためHを補正
	h = h % 360;

	if(l < 0.5)
	{
		max = 255 * (l + l * (s / 1.0));
		min  = 255 * (l - l * (s / 1.0));
	}
	else
	{
		max = 255 * (l + (1.0 - l) * (s / 1.0));
		min = 255 * (l - (1.0 - l) * (s / 1.0)); 
	}
	 
	if(h < 60)
	{
		r = max;
		g = min + (max - min) * (h / 60);
		b = min;
	}
	else if((h >= 60) && (h < 120))
	{
		r = min + (max - min) * ((120 - h) / 60);
		g = max;
		b = min;
	 }
	 else if((h >= 120) && (h < 180))
	 {
		r = min;
		g = max;
		b = min + (max - min) * ((h - 120) / 60);        
	}
	else if((h >= 180) && (h < 240))
	{
		r = min;
		g = min + (max - min) * ((240 - h) / 60);
		b = max;
	}
	else if((h >= 240) && (h < 300))
	{
		r = min + (max - min) * ((h - 240) / 60);
		g = min;
		b = max;
	}
	else if((h >= 300) && (h < 360))
	{
		r = max;
		g = min;
		b = min + (max - min) * ((360 - h) / 60); 
	}

	r =  Math.round(r);
	g =  Math.round(g);
	b =  Math.round(b);
	
	return { r:r/255, g: g/255, b: b/255 };
}

//パーリンノイズクラス
//https://gist.github.com/Flafla2/f0260a861be0ebdeef76
//↑のC#のソースを参考に雑に移植しています。
//ご利用は自己責任でお願いします。
class Perlin
{
	//コンストラクタ
	constructor(repeat = -1)
	{
		//メンバの初期化
		this.repeat = repeat;
		
		const permutation =
		[
			151,160,137,91,90,15,															// Hash lookup table as defined by Ken Perlin.  This is a randomly
			131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,	// arranged array of all numbers from 0-255 inclusive.
			190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
			88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
			77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
			102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
			135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
			5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
			223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
			129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
			251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
			49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
			138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180
		];
		
		this.p = new Int32Array(512);
		for(let x = 0;x < 512;x++)
		{
			this.p[x] = permutation[x%256];
		}
	}
	
	inc(num)
	{
		num++;
		if(this.repeat > 0){ num %= this.repeat; }
		return num;
	}
	
	grad(hash,x,y,z)
	{
		 switch(hash & 0xF)
	    {
	        case 0x0: return  x + y;
	        case 0x1: return -x + y;
	        case 0x2: return  x - y;
	        case 0x3: return -x - y;
	        case 0x4: return  x + z;
	        case 0x5: return -x + z;
	        case 0x6: return  x - z;
	        case 0x7: return -x - z;
	        case 0x8: return  y + z;
	        case 0x9: return -y + z;
	        case 0xA: return  y - z;
	        case 0xB: return -y - z;
	        case 0xC: return  y + x;
	        case 0xD: return -y + z;
	        case 0xE: return  y - x;
	        case 0xF: return -y - z;
	        default: return 0; // never happens
	    }
	}
	
	fade(t)
	{
		// Fade function as defined by Ken Perlin.  This eases coordinate values
		// so that they will "ease" towards integral values.  This ends up smoothing
		// the final output.
		return t * t * t * (t * (t * 6 - 15) + 10);		// 6t^5 - 15t^4 + 10t^3
	}
	
	lerp(a,b,x)
	{
		return a + x * (b - a);
	}
	
	//パーリンノイズ取得(0.0～1.0の値が返ります)
	perlin(x,y,z)
	{
		if(this.repeat > 0)
		{
			// If we have any repeat on, 
			// change the coordinates to their "local" repetitions
			x = x % this.repeat;
			y = y % this.repeat;
			z = z % this.repeat;
		}
		
		const xi = Math.floor(x) & 255;		// Calculate the "unit cube" that the point asked will be located in
		const yi = Math.floor(y) & 255;		// The left bound is ( |_x_|,|_y_|,|_z_| ) and the right bound is that
		const zi = Math.floor(z) & 255;		// plus 1.  Next we calculate the location (from 0.0 to 1.0) in that cube.
		const xf = x - Math.floor(x);		// We also fade the location to smooth the result.
		const yf = y - Math.floor(y);
		const zf = z - Math.floor(z);
		const  u = this.fade(xf);
		const  v = this.fade(yf);
		const  w = this.fade(zf);
															
		const aaa = this.p[this.p[this.p[         xi ]+         yi ]+         zi ];
		const aba = this.p[this.p[this.p[         xi ]+this.inc(yi)]+         zi ];
		const aab = this.p[this.p[this.p[         xi ]+         yi ]+this.inc(zi)];
		const abb = this.p[this.p[this.p[         xi ]+this.inc(yi)]+this.inc(zi)];
		const baa = this.p[this.p[this.p[this.inc(xi)]+         yi ]+         zi ];
		const bba = this.p[this.p[this.p[this.inc(xi)]+this.inc(yi)]+         zi ];
		const bab = this.p[this.p[this.p[this.inc(xi)]+         yi ]+this.inc(zi)];
		const bbb = this.p[this.p[this.p[this.inc(xi)]+this.inc(yi)]+this.inc(zi)];
	
		let x1 = this.lerp(this.grad(aaa, xf  , yf  , zf),	// The gradient function calculates the dot product between a pseudorandom
						   this.grad(baa, xf-1, yf  , zf),	// gradient vector and the vector from the input coordinate to the 8
						   u);								// surrounding points in its unit cube.
		let x2 = this.lerp(this.grad(aba, xf  , yf-1, zf),	// This is all then lerped together as a sort of weighted average based on the faded (u,v,w)
						   this.grad(bba, xf-1, yf-1, zf),	// values we made earlier.
						   u);
		let y1 = this.lerp(x1, x2, v);

		x1 = this.lerp(this.grad(aab, xf  , yf  , zf-1),
					   this.grad(bab, xf-1, yf  , zf-1),
					   u);
		x2 = this.lerp(this.grad(abb, xf  , yf-1, zf-1),
		          	   this.grad(bbb, xf-1, yf-1, zf-1),
		          	   u);
		let y2 = this.lerp(x1, x2, v);
		
		return (this.lerp(y1, y2, w)+1)/2;	// For convenience we bound it to 0 - 1 (theoretical min/max before is -1 - 1)
	}
	
	octavePerlin(x,y,z,octaves,persistence)
	{
		let total     = 0;
		let frequency = 1;
		let amplitude = 1;
		let maxValue  = 0;	// Used for normalizing result to 0.0 - 1.0
		for(let i=0;i<octaves;i++)
		{
			total += this.perlin(x * frequency, y * frequency, z * frequency) * amplitude;
			
			maxValue += amplitude;
			
			amplitude *= persistence;
			frequency *= 2;
		}
		
		return total/maxValue;
	}
	
}

//疑似シェーダ関数クラス
//https://www.khronos.org/registry/OpenGL-Refpages/gl4/
//https://yrlab.zatunen.com/webgl/noise/noise.html
//これらのサイトを参考にシェーダ内で利用できる関数を
//模倣したものです。
//ご利用は自己責任でお願いします。
class SL
{
	//コンストラクタ
	constructor()
	{
	}
	
	static sin(a)
	{
		return Math.sin(a);
	}
	
	static cos(a)
	{
		return Math.cos(a);
	}
	
	static tan(a)
	{
		return Math.tan(a);
	}
	
	static fract(f)
	{
		return f - Math.floor(f);
	}
	
	static dot2(a,b,c,d)
	{
		return a*c+b*d;
	}
	
	static dot3(a,b)
	{
		return a.x*b.x + a.y*b.y + a.z*b.z;
	}
	
	static random(x,y)
	{
		//0.0 ～ 1.0の乱数を返す
		return this.fract(this.sin(this.dot2(x,y,12.9898,78.233)) * 43758.5453);
	}
	
	static random2(x,y)
	{
		return { x: this.random(x,y), y: this.random(x + 0.5,y + 0.5) };
	}
	
	static random3(x,y)
	{
		let st = { x: this.dot2(x,y,127.1,311.7),
			       y: this.dot2(x,y,269.5,183.2) };
		st = { x: -1.0 + 2.0 * this.fract(this.sin(st.x) * 43758.5453123),
			   y: -1.0 + 2.0 * this.fract(this.sin(st.y) * 43758.5453123) };
		return st;
	}
	
	static interpolation(f)
	{
		// 0.0 ～ 1.0の補間式、5次のものがアーティファクト少なくていいらしい
		//return f * f * (3.0 - 2.0 * f);
		return f * f * f * (f * (6.0 * f - 15.0) + 10.0);
	}
	
	static clamp(x,a,b)
	{
		return Math.max(a,Math.min(b,x));
	}
	
	static length(x,y)
	{
		return Math.sqrt(x*x+y*y);
	}
	
	static mix(x,y,a)
	{
		return x * (1.0 - a) + y * a;
	}
	
	static mixCol(col1,col2,a)
	{
		//r,g,bは0.0～1.0
		
		const aa  = 1.0 - a;
		const col =
		{
			r: this.clamp(col1.r * aa + col2.r * a,0.0,1.0),
			g: this.clamp(col1.g * aa + col2.g * a,0.0,1.0),
			b: this.clamp(col1.b * aa + col2.b * a,0.0,1.0)
		};
		
		return col;
	}
	
	static rotate2d(angle,x,y)
	{
		//Z軸回転
		const rx =  x * Math.cos(angle) + y * Math.sin(angle);
		const ry = -x * Math.sin(angle) + y * Math.cos(angle);
		return { x:rx,y:ry };
	}
	
	static smoothstep(edge0,edge1,x)
	{
		//Wikipediaより
	    // Scale, bias and saturate x to 0..1 range
	    x = this.clamp((x - edge0) / (edge1 - edge0),0.0,1.0);
	    // Evaluate polynomial
	    return x*x*(3-2*x);
	}
}

//ブロックノイズクラス
//https://yrlab.zatunen.com/webgl/noise/noise.html
//↑の記事を参考に実装しています。
//ご利用は自己責任でお願いします。
class BlockNoise
{
	//コンストラクタ
	constructor()
	{
	}
	
	static noise(x,y)
	{
		const xx = Math.floor(x * 8.0);
		const yy = Math.floor(y * 8.0);
		return SL.random(xx,yy);
	}
	
}

//バリューノイズクラス
//https://yrlab.zatunen.com/webgl/noise/noise.html
//↑の記事を参考に実装しています。
//ご利用は自己責任でお願いします。
class ValueNoise
{
	//コンストラクタ
	constructor()
	{
	}
	
	static noise(x,y)
	{
		const ix = Math.floor(x * 8.0);
		const iy = Math.floor(y * 8.0);
		const fx = SL.fract(x * 8.0);
		const fy = SL.fract(y * 8.0);
		const f1 = SL.random(ix      ,iy      );
		const f2 = SL.random(ix + 1.0,iy      );
		const f3 = SL.random(ix      ,iy + 1.0);
		const f4 = SL.random(ix + 1.0,iy + 1.0);
		
		return SL.mix(SL.mix(f1,f2,SL.interpolation(fx)),
					  SL.mix(f3,f4,SL.interpolation(fx)),
					  SL.interpolation(fy));
	}
	
}

//セルラーノイズクラス
//https://yrlab.zatunen.com/webgl/noise/noise.html
//↑の記事を参考に実装しています。
//ご利用は自己責任でお願いします。
class CellularNoise
{
	//コンストラクタ
	constructor()
	{
	}
	
	static noise(x,y)
	{
		const ix = Math.floor(x * 8.0);
		const iy = Math.floor(y * 8.0);
		const fx = SL.fract(x * 8.0);
		const fy = SL.fract(y * 8.0);
		
		let o = 1.0;
		for(let yy = -1;yy <= 1;++yy)
		{
			for(let xx = -1;xx <= 1;++xx)
			{
				let r  = SL.random2(ix + xx,iy + yy);
				let r2 = SL.random2(r.x,r.y);
				r.x   += (r2.x * 2.0 - 1.0) * 0.5;
				r.y   += (r2.y * 2.0 - 1.0) * 0.5;
				r.x    = Math.max(Math.min(r.x,1.0),0.0);
				r.y    = Math.max(Math.min(r.y,1.0),0.0);
				o      = Math.min(SL.length(fx - (xx + r.x),fy - (yy + r.y)),o);
			}
		}
		
		o = Math.min(Math.pow(o * 1.0,3.0),1.0);	//値の勾配を調整
		
		return o
	}
	
}

//反転セルラーノイズクラス
//https://yrlab.zatunen.com/webgl/noise/noise.html
//↑の記事を参考に実装しています。
//ご利用は自己責任でお願いします。
class InverseCellularNoise
{
	//コンストラクタ
	constructor()
	{
	}
	
	static noise(x,y)
	{
		return 1.0 - CellularNoise.noise(x,y);
	}
	
}

//ドメインワーピングクラス
//https://qiita.com/edo_m18/items/e4d7a084cdbbfdc7863c
//↑の記事を参考に実装しています。
//ご利用は自己責任でお願いします。
class DomainWarping
{
	//コンストラクタ
	constructor()
	{
		//メンバの初期化
		this.pn        = new Perlin();
		this.noise     = this.perlin_noise;
		this.octaves   = 5;
		this.gain      = 0.5;
		this.mixColor1 = { r:0.8,g:0.35,b:0.12 };
		this.mixColor2 = { r:0.3,g:0.75,b:0.69 };
	}
	
	setNoiseFunc(fn)
	{
		this.noise = fn;
	}
	
	setOctaves(o)
	{
		this.octaves = o;
	}
	
	setGain(g)
	{
		this.gain = g;
	}
	
	setMixColor1(color)
	{
		this.mixColor1.r = color.r;
		this.mixColor1.g = color.g;
		this.mixColor1.b = color.b;
	}
	
	setMixColor2(color)
	{
		this.mixColor2.r = color.r;
		this.mixColor2.g = color.g;
		this.mixColor2.b = color.b;
	}
	
	perlin_noise(x,y)
	{
		return this.pn.perlin(x,y,0);
	}
	
	fbm(x,y)
	{
		let v = 0.0;
		let a = 0.5;
		
		for(let i = 0;i < this.octaves;++i)
		{
			v += a * this.noise(x,y);
			x *= 2.0;
			y *= 2.0;
			a *= this.gain;
		}
		
		return v;
	}
	
	getColor(x,y,t)
	{
		//x,y は 0.0 ～ 1.0
		
		let color = { r:0.0,g:0.0,b:0.0 };
		
		let q = { x:0,y:0 };
		q.x = this.fbm(x,y);
		q.y = this.fbm(x + 1.0,y + 1.0);
		
		//1.7や9.2は任意の数値です。特別な意味はないです。
    	let r = { x:0,y:0 };
    	const add_qx  = (4.0 * q.x);
    	const add_qy  = (4.0 * q.y);
    	const add_rxt = (0.15 * t);
    	const add_ryt = (0.12 * t);
    	const add_rx1 = add_qx + 1.7 + add_rxt;
    	const add_rx2 = add_qy + 9.2 + add_rxt;
    	const add_ry1 = add_qx + 8.3 + add_ryt;
    	const add_ry2 = add_qy + 2.8 + add_ryt;
	    r.x = this.fbm(x + add_rx1,y + add_rx2);
    	r.y = this.fbm(x + add_ry1,y + add_ry2);

		color = SL.mixCol(color,this.mixColor1,SL.clamp(SL.length(q.x,q.y),0.0,1.0));
	    color = SL.mixCol(color,this.mixColor2,SL.clamp(SL.length(r.x,r.y),0.0,1.0));

		const add_rx = (4.0 * r.x);
    	const add_ry = (4.0 * r.y);
    	const f      = this.fbm(x + add_rx,y + add_ry);
		
		// f^3 + 0.6f^2 + 0.5f
	    const coef = (f * f * f + (0.6 * f * f) + (0.5 * f));
    	color.r = SL.clamp(color.r * coef,0.0,1.0);
		color.g = SL.clamp(color.g * coef,0.0,1.0);
		color.b = SL.clamp(color.b * coef,0.0,1.0);

		return color;
	}

}

//ウッドテクスチャクラス
//https://thebookofshaders.com/edit.php#11/wood.frag
//↑の記事を参考に実装しています。
//ご利用は自己責任でお願いします。
class WoodTexture
{
	//コンストラクタ
	constructor()
	{
		//メンバの初期化
		this.pn        = new Perlin();
		this.mp        = { x:3.0,y:10.0 }; 
		this.lp        = 0.5;
		this.baseColor = { r:1.0,g:1.0,b:1.0 };
	}
	
	setMultiParam(x,y)
	{
		this.mp.x = x;
		this.mp.y = y;
	}
	
	setLineParam(l)
	{
		this.lp = l;
	}
	
	setBaseColor(color)
	{
		this.baseColor.r = color.r;
		this.baseColor.g = color.g;
		this.baseColor.b = color.b;
	}
	
	lines(x,y,b)
	{
		const scale = 10.0;
		x *= scale;
		y *= scale;
		return SL.smoothstep(0.0,0.5+b*0.5,
							 Math.abs((Math.sin(x*3.1415)+b*2.0))*0.5);
	}
	
	getColor(x,y,t)
	{
		//x,y は 0.0 ～ 1.0
		
		let pos = { x:x * this.mp.x,y:y * this.mp.y };
		
		//Add noise
		pos = SL.rotate2d(this.pn.perlin(pos.x,pos.y,t),pos.x,pos.y);
		
		//Draw lines
		const pattern = this.lines(pos.x,pos.y,this.lp);
		
		const color =
		{
			r: this.baseColor.r * pattern,
			g: this.baseColor.g * pattern,
			b: this.baseColor.b * pattern
		};

		return color;
	}

}

//リッジ(尾根)テクスチャクラス
//https://thebookofshaders.com/edit.php#13/ridge.frag
//↑の記事を参考に実装しています。
//ご利用は自己責任でお願いします。
class RidgeTexture
{
	//コンストラクタ
	constructor()
	{
		//メンバの初期化
		this.pn        = new Perlin();
		this.gain      = 0.5;
		this.offset    = 0.9;
		this.octaves   = 4;
		this.baseColor = { r:1.0,g:1.0,b:1.0 };
	}
	
	setGain(g)
	{
		this.gain = g;
	}
	
	setOffset(o)
	{
		this.offset = o;
	}
	
	setOctaves(o)
	{
		this.octaves = o;
	}
	
	setBaseColor(color)
	{
		this.baseColor.r = color.r;
		this.baseColor.g = color.g;
		this.baseColor.b = color.b;
	}

	ridge(h,offset)
	{
		h = Math.abs(h);
		h = offset - h;
		h = h * h;
		return h;	
	}
	
	getColor(x,y,t)
	{
		//x,y は 0.0 ～ 1.0
		
		const lacunarity = 2.0;
		const gain       = this.gain;
		const offset     = this.offset;
		const octaves    = this.octaves;
		
		let sum  = 0.0;
		let freq = 1.0;
		let amp  = 0.5;
		let prev = 1.0;
		for(let i = 0;i < octaves;++i)
		{
			let n = this.ridge(g_pn.perlin(x,y,t),offset);
			sum  += n * amp;
			sum  += n * amp * prev;
			prev  = n;
			freq *= lacunarity;
			amp  *= gain;
		}
		
		const color =
		{
			r: SL.clamp(this.baseColor.r * sum,0.0,1.0),
			g: SL.clamp(this.baseColor.g * sum,0.0,1.0),
			b: SL.clamp(this.baseColor.b * sum,0.0,1.0)
		};

		return color;
	}

}

//タービュランス(乱気流)テクスチャクラス
//https://thebookofshaders.com/edit.php#13/turbulence.frag
//↑の記事を参考に実装しています。
//ご利用は自己責任でお願いします。
class TurbulenceTexture
{
	//コンストラクタ
	constructor()
	{
		//メンバの初期化
		this.pn        = new Perlin();
		this.gain      = 2;
		this.octaves   = 3;
		this.baseColor = { r:1.0,g:1.0,b:1.0 };
	}
	
	setGain(g)
	{
		this.gain = g;
	}
	
	setOctaves(o)
	{
		this.octaves = o;
	}
	
	setBaseColor(color)
	{
		this.baseColor.r = color.r;
		this.baseColor.g = color.g;
		this.baseColor.b = color.b;
	}

	//ほんとは、RidgeTextureと同じsnoiseを使うのですが、
	//再現が上手く出来なかったので、これもパーリンノイズ
	//で代用します
	
	getColor(x,y,t)
	{
		//x,y は 0.0 ～ 1.0
		
		const gain    = this.gain;
		const octaves = this.octaves;
		
		let val = 0.0;
		let amp = 0.5;
		for(let i = 0;i < octaves;++i)
		{
			val += amp * Math.abs(g_pn.perlin(x,y,t));
			x   *= 2.0;
			y   *= 2.0;
			amp *= gain;
		}
		
		const color =
		{
			r: SL.clamp(this.baseColor.r * val,0.0,1.0),
			g: SL.clamp(this.baseColor.g * val,0.0,1.0),
			b: SL.clamp(this.baseColor.b * val,0.0,1.0)
		};

		return color;
	}

}

//スプラッターテクスチャクラス
//https://thebookofshaders.com/edit.php#11/splatter.frag
//↑の記事を参考に実装しています。
//ご利用は自己責任でお願いします。
class SplatterTexture
{
	//コンストラクタ
	constructor()
	{
		//メンバの初期化
		this.pn        = new Perlin();
		this.gain      = 10;
		this.baseColor = { r:1.0,g:1.0,b:1.0 };
	}
	
	setGain(g)
	{
		this.gain = g;
	}
	
	setBaseColor(color)
	{
		this.baseColor.r = color.r;
		this.baseColor.g = color.g;
		this.baseColor.b = color.b;
	}

	getColor(x,y,t)
	{
		//x,y は 0.0 ～ 1.0
		
		const gain = this.gain;
		
		let st = { x: x + this.pn.perlin(x * 2.0,y * 2.0,t),
				   y: y + this.pn.perlin(x * 2.0,y * 2.0,t) };
		let c  = 1.0 * SL.smoothstep(0.18,0.2,this.pn.perlin(st.x,st.y,0));			// Big black drops
		    c += SL.smoothstep(0.15,0.2,this.pn.perlin(st.x * gain,st.y * gain,0));	// Black splatter
		    c -= SL.smoothstep(0.35,0.4,this.pn.perlin(st.x * gain,st.y * gain,0));	// Holes on splatter
		    c  = c * c * c * c;
		    
		const color =
		{
			r: SL.clamp(this.baseColor.r * c,0.0,1.0),
			g: SL.clamp(this.baseColor.g * c,0.0,1.0),
			b: SL.clamp(this.baseColor.b * c,0.0,1.0)
		};

		return color;
	}

}

//イージング関数クラス
//https://easings.net/ja#
//↑のソースを参考に雑に移植しています。
//ご利用は自己責任でお願いします。
class Ease
{
	//コンストラクタ
	constructor()
	{
	}
	
	static easeInSine(x)
	{
		return 1 - Math.cos((x * Math.PI) / 2);
	}

	static easeOutSine(x)
	{
		return Math.sin((x * Math.PI) / 2);
	}

	static easeInOutSine(x)
	{
		return -(Math.cos(Math.PI * x) - 1) / 2;
	}
	
	static easeInQuad(x)
	{
		return x * x;
	}

	static easeOutQuad(x)
	{
		return 1 - (1 - x) * (1 - x);
	}

	static easeInOutQuad(x)
	{
		return (x < 0.5) ? (2 * x * x) : (1 - Math.pow(-2 * x + 2, 2) / 2);
	}

	static easeInCubic(x)
	{
		return x * x * x;
	}

	static easeOutCubic(x)
	{
		return 1 - Math.pow(1 - x, 3);
	}

	static easeInOutCubic(x)
	{
		return (x < 0.5) ? (4 * x * x * x) : (1 - Math.pow(-2 * x + 2, 3) / 2);
	}

	static easeInQuart(x)
	{
		return x * x * x * x;
	}

	static easeOutQuart(x)
	{
		return 1 - Math.pow(1 - x, 4);
	}

	static easeInOutQuart(x)
	{
		return (x < 0.5) ? (8 * x * x * x * x) : (1 - Math.pow(-2 * x + 2, 4) / 2);
	}

	static easeInQuint(x)
	{
		return x * x * x * x * x;
	}

	static easeOutQuint(x)
	{
		return 1 - Math.pow(1 - x, 5);
	}

	static easeInOutQuint(x)
	{
		return (x < 0.5) ? (16 * x * x * x * x * x) : (1 - Math.pow(-2 * x + 2, 5) / 2);
	}

	static easeInExpo(x)
	{
		return (x === 0) ? 0 : Math.pow(2, 10 * x - 10);
	}

	static easeOutExpo(x)
	{
		return (x === 1) ? 1 : (1 - Math.pow(2, -10 * x));
	}

	static easeInOutExpo(x)
	{
		return (x === 0)
  			    ? 0
  				: ((x === 1)
  				    ? 1
  				    : ((x < 0.5)
  				        ? (Math.pow(2, 20 * x - 10) / 2)
  				        : ((2 - Math.pow(2, -20 * x + 10)) / 2)
  				      )
  				  );
	}

	static easeInCirc(x)
	{
		return 1 - Math.sqrt(1 - Math.pow(x, 2));
	}

	static easeOutCirc(x)
	{
		return Math.sqrt(1 - Math.pow(x - 1, 2));
	}

	static easeInOutCirc(x)
	{
		return (x < 0.5)
  				? ((1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2)
  				: ((Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2);
	}

	static easeInBack(x)
	{
		const c1 = 1.70158;
		const c3 = c1 + 1;

		return c3 * x * x * x - c1 * x * x;
	}

	static easeOutBack(x)
	{
		const c1 = 1.70158;
		const c3 = c1 + 1;

		return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
	}

	static easeInOutBack(x)
	{
		const c1 = 1.70158;
		const c2 = c1 * 1.525;

		return (x < 0.5)
  				? ((Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2)
  				: ((Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2);
	}

	static easeInElastic(x)
	{
		const c4 = (2 * Math.PI) / 3;

		return (x === 0)
  				? 0
  				: ((x === 1)
  				    ? 1
  				    : (-Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4))
  				  );
	}

	static easeOutElastic(x)
	{
		const c4 = (2 * Math.PI) / 3;

		return (x === 0)
  				? 0
  				: ((x === 1)
  				    ? 1
  				    : (Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1)
  				  );
	}

	static easeInOutElastic(x)
	{
		const c5 = (2 * Math.PI) / 4.5;

		return (x === 0)
  				? 0
  				: ((x === 1)
  				    ? 1
  				    : ((x < 0.5)
  				 	    ? (-(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2)
  					    : ((Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1)
  					  )
  				  );
	}

	static easeInBounce(x)
	{
		return 1 - Ease.easeOutBounce(1 - x);
	}

	static easeOutBounce(x)
	{
		const n1 = 7.5625;
		const d1 = 2.75;

		if (x < 1 / d1) {
		    return n1 * x * x;
		} else if (x < 2 / d1) {
		    return n1 * (x -= 1.5 / d1) * x + 0.75;
		} else if (x < 2.5 / d1) {
		    return n1 * (x -= 2.25 / d1) * x + 0.9375;
		} else {
		    return n1 * (x -= 2.625 / d1) * x + 0.984375;
		}
	}

	static easeInOutBounce(x)
	{
		return (x < 0.5)
  				? ((1 - Ease.easeOutBounce(1 - 2 * x)) / 2)
  				: ((1 + Ease.easeOutBounce(2 * x - 1)) / 2);
	}
	
}

//
// 以下の、 https://coolors.co/ で作成した色見本から、パレット配列を
// 生成するコードは、takawo shunsukeさん(@takawo)の作品からお借りしました。
//
function createPalette(_url) {
	let slash_index = _url.lastIndexOf('/');
	let pallate_str = _url.slice(slash_index + 1);
	let arr = pallate_str.split('-');
	for (let i = 0; i < arr.length; i++) {
		arr[i] = '#' + arr[i];
	}
	return arr;
}

function createPaletteN(_url)
{
	//coolors.co のURLから正規化されたRGBオブジェクト配列にします
	let slash_index = _url.lastIndexOf('/');
	let pallate_str = _url.slice(slash_index + 1);
	let arr = pallate_str.split('-');
	let col = [];
	for (let i = 0; i < arr.length; i++) {
		const r = parseInt(arr[i].substr(0,2),16) / 255;
		const g = parseInt(arr[i].substr(2,2),16) / 255;
		const b = parseInt(arr[i].substr(4,2),16) / 255;
		col.push({ r,g,b });
	}
	return col;
}

function rgbA2rgbN(rgb)
{
	//0～255のRGB配列を正規化された
	//RGBオブジェクトに変換します	
	return { r:rgb[0]/255, g:rgb[1]/255, b:rgb[2]/255 };
}

function rgbAA2rgbNA(rgb_array)
{
	//0～255のRGB配列の配列を正規化された
	//RGBオブジェクトの配列に変換します
	let col = [];
	for(let i = 0;i < rgb_array.length;++i)
	{
		col.push(rgbA2rgbN(rgb_array[i]));
	}
	return col;
}

//
// シャッフルメソッドはp5.jsのリファレンスを参考に、下記の
// サイトのコードを利用しています。
// https://bost.ocks.org/mike/shuffle/
//
function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

function mixPalette(col1,col2,a)
{
	//col1,col2は#rrggbb
	const r1 = parseInt(col1.substr(1,2),16);
	const g1 = parseInt(col1.substr(3,2),16);
	const b1 = parseInt(col1.substr(5,2),16);
	const r2 = parseInt(col2.substr(1,2),16);
	const g2 = parseInt(col2.substr(3,2),16);
	const b2 = parseInt(col2.substr(5,2),16);
	
	const aa  = 1.0 - a;
	const r = Math.floor(SL.clamp(r1 * aa + r2 * a,0,255));
	const g = Math.floor(SL.clamp(g1 * aa + g2 * a,0,255));
	const b = Math.floor(SL.clamp(b1 * aa + b2 * a,0,255));
	
	const col = "#"+("00"+r.toString(16)).slice(-2)+
			        ("00"+g.toString(16)).slice(-2)+
			        ("00"+b.toString(16)).slice(-2);
	return col;
}

function color2rgb(col)
{
	//colは#rrggbb
	const r = parseInt(col.substr(1,2),16);
	const g = parseInt(col.substr(3,2),16);
	const b = parseInt(col.substr(5,2),16);
	
	return { r:r/255, g: g/255, b: b/255 };
}

function getColormind(ok_func,ng_func = null)
{
	//Colormindからのパレット取得
	
	//
	// http://colormind.io/api-access/ のサンプルを元に実装しています。
	//
	
	const url = "http://colormind.io/api/";
	const data = {
		model : "default"
	}

	let http = new XMLHttpRequest();

	http.onreadystatechange = function()
	{
		if((http.readyState == 4) && (http.status == 200) &&
		   (http.responseText != ""))
		{
			const palette = JSON.parse(http.responseText).result;
			
			//リクエスト成功
			if(ok_func != null)
			{
				ok_func(palette);
			}
		}
		else if(http.readyState == 4)
		{
			//リクエスト失敗
			if(ng_func != null)
			{
				ng_func(http.status);
			}
		}
	}
	
	//リクエスト送信
	http.open("POST", url, true);
	http.send(JSON.stringify(data));

}

