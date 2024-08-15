import { useCallback, useEffect, useState } from "react"

interface IndicatiorModel {
  title: String,
  number: number,
  isLoaded: boolean
}


export default function IndicationComponent({ title, number, isLoaded }: IndicatiorModel) {
  const [numberAnimation, setNumberAnimation] = useState<number>(number > 0 ? number - 20 : 0); // Start animation from number - 20 or 0 if number is 0
  const [intervalValue, setIntervalValue] = useState<number>(50);
  let intervalId: any;

  const sequence = useCallback(() => {
    setNumberAnimation(prevNumberAnimation => {
      if (number === 0 && prevNumberAnimation > 0) {
        return Math.max(0, prevNumberAnimation - 10); // Decrement by 10 until it reaches 0
      } else if (prevNumberAnimation < number) {
        return prevNumberAnimation + 1; // Increment numberAnimation until it reaches number
      } else {
        return prevNumberAnimation;
      }
    });
  }, [number]);

  const intervalChecker = useCallback(() => {
    let slowInterval: number = 110;
    let fastInterval: number = 10;

    if (number > 300 && number <= 500) {
      slowInterval = 90;
    } else if (number > 500 && number < 1000) {
      slowInterval = 60;
    }

    setIntervalValue(() => (Math.abs(number - numberAnimation) < 28 ? slowInterval : fastInterval));
  }, [number, numberAnimation]);

  useEffect(() => {
    if (isLoaded) {
      intervalId = setInterval(sequence, intervalValue);
      intervalChecker();
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [sequence, intervalChecker, isLoaded, intervalValue]);


  return <>
    <div className="flex flex-col md:w-[19rem] w-full p-3">
      <div className="flex justify-evenly items-center m-1">
        <div className="w-[25px] h-[4px] bg-[#4E9169]"></div>
        <h2 className="text-white font-bold text-2xl transition-all">{numberAnimation}</h2>
        <div className="w-[25px] h-[4px] bg-[#4E9169]"></div>
      </div>
      <h3 className="text-white m-auto text-sm">{title}</h3>
    </div>
  </>
}