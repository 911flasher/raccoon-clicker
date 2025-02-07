import { Fragment, useCallback } from "react";

import { createStageClass, Stage } from "react-pixi-fiber";
import Benchmark from "./Bunnymark";

const COLORS = [0x10bb99,0xBFFCA8,0xBFFCA8, 0x10bb99];
const SIZES = [
  { width: 370, height: 370 }
];
const StageClass = createStageClass();

interface CanvasAppProps {
  callback: (point: { x: number, y: number }) => void; // Define the callback prop
  src:string;
}

function CanvasApp({ callback ,src}: CanvasAppProps) { 
  const backgroundColor = COLORS[0.01/* color */];
  const  backgroundAlpha = 0;
  const { width, height } = SIZES[0/* size */];
  const StageComponent =false ? StageClass : Stage;


    // Handle clicks and pass point to the callback
    const handlerClick = useCallback((point: { x: number, y: number }) => {
      callback(point); // Call the passed callback with the point
    }, [callback]);

  return (
    <Fragment>
      {/* mount */true && (
        <div style={{ position: "absolute", marginTop: "50px", width: "370px", height: "370px"}}>
        <StageComponent key={false ? "class" : "function"} options={{ backgroundColor, transparent:true, backgroundAlpha, height, width, position: "absolute", marginTop: "270px"/* ,  background-color: "transparent !important" */}}>
          <Benchmark handlerClick={handlerClick} img={src}/>
        </StageComponent>
        </div>
      )}
    </Fragment>
  );
}

export default CanvasApp;
