import { RootState } from "core/store"; // Assuming you have a RootState type defined in your store
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux"; // If you're using plain redux actions, otherwise use the correct type for your actions

export default function CounterDom() {
  const count = useSelector((state: RootState) => state.counter.count); // Typing the state
  const dispatch = useDispatch<Dispatch>(); // Typing the dispatch

  return (
    <div>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
      <span>Count: {count}</span>
    </div>
  );
}
