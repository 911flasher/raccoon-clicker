import * as PIXI from "pixi.js";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { ParticleContainer, Sprite, withApp } from "react-pixi-fiber";

const maxSize = 29;
const gravity = 0.12;
const maxWidth = 378;
const maxHeight = 360;
const maxX = 355;
const maxY = 360;
const minX = 10;
const minY = 55;

const bunnyAnchor = new PIXI.Point(0.5, 1);
const particleContainerProperties = {
  scale: false,
  position: true,
  rotation: false,
  uvs: false,
  tint: false,
};

const generateBunny = (texture,x,y) => ({
  speedX: Math.random() * 5 - 2.5,
  speedY: Math.random() * 5 - 5,
  texture: texture,
  x: x,
  y: y,
});

const moveBunny = (bunny) => {
  const movedBunny = { ...bunny };

  movedBunny.x += movedBunny.speedX;
  movedBunny.y += movedBunny.speedY;
  movedBunny.speedY += gravity;
  

  if (movedBunny.x > maxX) {
    movedBunny.speedX *= -0.2 /* -1 */;
    movedBunny.x = maxX;
  } else if (movedBunny.x < minX) {
    movedBunny.speedX *=  -0.2 /* -1 */;
    movedBunny.x = minX;
  }

  if (movedBunny.y > maxY) {
    movedBunny.speedY *= -0.1/* -0.85 */;
    movedBunny.y = maxY;
    if (Math.random() > 0.3) {
      movedBunny.speedY -= Math.random() * 3;
    }
  } else if (movedBunny.y < minY) {
    movedBunny.speedY = 0;
    movedBunny.y = minY;
  }

  return movedBunny;
};

const Bunnymark = ({ app, handlerClick ,img}) => {
  const [bunnys, setBunnys] = useState([]);
  const [bunnyTextures, setBunnyTextures] = useState([]);
  const [currentTexture, setCurrentTexture] = useState(0);
  const [tilt, setTilt] = useState(15);

  const [addPoint, setAddPoint] = useState({ x: 0, y: 0 });
  const [isAdding, setIsAdding] = useState(false);
  const isAddingRef = useRef(false); // Use a ref to keep track of isAdding
  const indexRef = useRef(-1); // Use a ref to keep track of isAdding
  const callbackHandler = handlerClick;
  const imgGuild = img;

  useEffect(() => {
    const bunnyTextures:PIXI.Texture = new PIXI.Texture.from(imgGuild);
    setBunnyTextures([bunnyTextures, bunnyTextures, bunnyTextures, bunnyTextures, bunnyTextures]);
    const initialTexture = 2;
    setCurrentTexture(initialTexture);
    app.ticker.add(animate);
    isAddingRef.current=false;
    return () => {
      app.ticker.remove(animate);
    };
  }, [app]);

  const animate = useCallback(() => {
    // Use the ref to access the latest value of isAdding
    if ( isAddingRef.current /* isAdding */ && bunnys.length <= maxSize) {
      
    } else {

      setBunnys((prevBunnies:any) => prevBunnies.map(moveBunny));
    }
  }, [currentTexture]);

  const mainHandlePointerDown = (event:any) => {
    if(isAddingRef.current === false){
      
      const clickX = event.data.global.x;
      const clickY = event.data.global.y+(Math.random() * 0.1);
      setAddPoint({x:clickX, y:clickY});
      setIsAdding(true);
    }
  };

  const mainHandlePointerUp = () => {
    isAddingRef.current = false; // Reset the ref to false
    setIsAdding(false);
    setCurrentTexture((currentTexture) => (currentTexture + 1) % 5);
   
  };

  useEffect(() => {
    if(isAdding && addPoint.x !== 0){
      isAddingRef.current = true;
      callbackHandler(addPoint)
      if(bunnys.length >= maxSize){

        if(indexRef.current < maxSize-1){
          indexRef.current += 1;
        }else{
          indexRef.current = 0;
        }
        const arrTemp = [ ...bunnys];
        const item:any = arrTemp[indexRef.current];
        item.x = addPoint.x;
        item.y = addPoint.y;
        item.speedX = Math.random() * 5 - 2.5,
        item.speedY = Math.random() * 5 - 5,
        setBunnys((prevBunnies:any[]) => [...arrTemp].map(moveBunny));
        
      } else {
        indexRef.current = indexRef.current+1;
        const addedBunny:any = generateBunny(currentTexture,addPoint.x,addPoint.y);
        setBunnys((prevBunnies:any[]) => [...prevBunnies, addedBunny].map(moveBunny));
        isAddingRef.current = false;
      }
      
      
    }
  },[isAdding,addPoint]);


  // Update the position of the circle on each frame
 

 

  return (
    <Fragment>
     
      <ParticleContainer maxSize={maxSize} properties={particleContainerProperties}>
        {bunnys.map((bunny:any, i) => (
          <Sprite
            key={i}
            height={/* 37 */42}
            width={/* 26 */30}
            anchor={bunnyAnchor}
            texture={bunnyTextures[bunny.texture]}
            x={bunny.x}
            y={bunny.y}
            // rotation={(tilt * Math.PI) / 180}
          />
        ))}
      </ParticleContainer>
      <Sprite
        height={maxHeight}
        interactive
        pointerdown={mainHandlePointerDown}
        pointerup={mainHandlePointerUp}
        texture={PIXI.Texture.EMPTY}
        width={maxWidth}
        // y={70}
      />
    </Fragment>
  );
};


export default withApp(Bunnymark);
