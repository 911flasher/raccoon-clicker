import { RootState } from "core/store"; // Adjust this import based on your structure
import { Container, Text } from "react-pixi-fiber";
import { useDispatch, useSelector } from "react-redux"; // Ensure react-redux is imported correctly
import { Dispatch } from "redux"; // Adjust the import if needed

const style: any = {
  fontSize: 16,
};

interface CounterProps {
  position: [number, number];
}

// CounterPix Component
const CounterPix: React.FC<CounterProps> = ({ position, ...props }) => {
  const count = useSelector((state: RootState) => state.counter.count); // Make sure RootState is correctly defined
  const dispatch = useDispatch<Dispatch>();

  return (
    <Container position={position} {...props}>
      <Text
        buttonMode
        interactive
        pointerup={() => dispatch({ type: "INCREMENT" })}
        position={[5, 5]} // Make sure this is in array format
        style={style}
        text="+"
      />
      <Text
        buttonMode
        interactive
        pointerup={() => dispatch({ type: "DECREMENT" })}
        position={[30, 5]} // Make sure this is in array format
        style={style}
        text="-"
      />
      <Text position={[50, 5]} style={style} text={`Count: ${count}`} />
    </Container>
  );
};

export default CounterPix;
