import { useState } from 'react';

function Counter() {
  // useState returns an array with two elements:
  // 1. The current state value (count)
  // 2. A function to update the state (setCount)
  const [count, setCount] = useState(0); 

  const handleClick = () => {
    // Calling the setter function (setCount) updates the state
    // and tells React to re-render the component.
    setCount(count + 1);
  };

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={handleClick}>
        Click me
      </button>
    </div>
  );
}

export default Counter;