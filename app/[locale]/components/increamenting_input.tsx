import { memo, useCallback, useState, useEffect } from "react";

interface IncreamentingInputWidgetProps {
  component: JSX.Element;
}

// Wrap the `component` prop in a separate memoized component
const MemoizedComponent = memo(({ component }: { component: JSX.Element }) => {
  return component;
});

function IncreamentingInputWidget({ component }: IncreamentingInputWidgetProps) {
  const [components, setComponents] = useState<JSX.Element[]>([]);

  const increment = useCallback(() => {
    if(components.length == 0){
        setComponents(()=>[<MemoizedComponent key={Math.random()} component={component} />])
    }
  }, [component]);

  useEffect(() => {
    increment();
  }, [component]); // Dependency for increment

  function addNewComponent() {
    setComponents(prevComponents => [...prevComponents, <MemoizedComponent key={prevComponents.length} component={component} />]);
  }

  return (
    <div className="flex items-end w-full">
      <div className="flex flex-col w-full">{components}</div>
      <button
        className="px-3 pb-1 text-center rounded-sm text-white text-2xl bg-blue-400 my-1 mx-2"
        onClick={addNewComponent}
      >
        +
      </button>
    </div>
  );
}

export default memo(IncreamentingInputWidget);