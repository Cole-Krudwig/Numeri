// DrawingBoard.tsx
import React, { useRef, useEffect, useState } from "react";

interface Position {
  x: number;
  y: number;
}

const DrawingBoard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const questionBoxRef = useRef<HTMLDivElement | null>(null);
  const [drawing, setDrawing] = useState<boolean>(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [color, setColor] = useState<string>("#000000"); // Default color is black
  const [lineWidth, setLineWidth] = useState<number>(2); // Default line width
  const [eraser, setEraser] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    setContext(ctx);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    const handleStart = (e: MouseEvent | TouchEvent): void => {
      e.preventDefault();
      const { x, y } = getEventPosition(e);
      setDrawing(true);
      draw(x, y);
    };

    const handleEnd = (): void => {
      setDrawing(false);
      context?.beginPath(); // Start a new path after releasing the touch or mouse
    };

    const handleMove = (e: MouseEvent | TouchEvent): void => {
      if (!drawing || !context) return;
      const { x, y } = getEventPosition(e);
      draw(x, y);
    };

    if (canvas) {
      canvas.addEventListener("mousedown", handleStart, { passive: false });
      canvas.addEventListener("mouseup", handleEnd, { passive: false });
      canvas.addEventListener("mousemove", handleMove, { passive: false });

      canvas.addEventListener("touchstart", handleStart, { passive: false });
      canvas.addEventListener("touchend", handleEnd, { passive: false });
      canvas.addEventListener("touchmove", handleMove, { passive: false });

      return () => {
        canvas.removeEventListener("mousedown", handleStart);
        canvas.removeEventListener("mouseup", handleEnd);
        canvas.removeEventListener("mousemove", handleMove);

        canvas.removeEventListener("touchstart", handleStart);
        canvas.removeEventListener("touchend", handleEnd);
        canvas.removeEventListener("touchmove", handleMove);
      };
    }
  }, [drawing, context]);

  const getEventPosition = (e: MouseEvent | TouchEvent): Position => {
    if ("touches" in e) {
      const touch = e.touches[0];
      return { x: touch.clientX, y: touch.clientY };
    } else {
      return { x: e.clientX, y: e.clientY };
    }
  };

  useEffect(() => {
    // Attach the ref to the current question box
    questionBoxRef.current = document.getElementById(
      "dynamicQuestionBox"
    ) as HTMLDivElement;
  }, []); // Run this effect only once when the component mounts

  const draw = (x: number, y: number): void => {
    const navbarHeight = 60; // Set the height of your navbar
    const questionBoxWidth = 200; // Set the width of your question box
    const questionBoxHeight = 100; // Set the height of your question box

    // Check if the cursor is within the dead zones (navbar or question box)
    const isCursorInDeadZone =
      y < navbarHeight || (x > 840 && x < 1200 && y > 190 && y < 372);

    if (!isCursorInDeadZone) {
      // Get the bounding box of the question box
      const questionBoxRect = questionBoxRef.current?.getBoundingClientRect();

      // Check if the cursor is within the question box
      const isCursorInQuestionBox =
        questionBoxRect &&
        x >= questionBoxRect.left &&
        x <= questionBoxRect.right &&
        y >= questionBoxRect.top &&
        y <= questionBoxRect.bottom;

      if (!isCursorInQuestionBox) {
        context!.lineCap = "round";
        context!.lineJoin = "round";
        context!.lineWidth = eraser ? 20 : lineWidth;
        context!.strokeStyle = eraser ? "#ffffff" : color;

        if (drawing) {
          context!.lineTo(x, y);
          context!.stroke();
          context!.beginPath();
          context!.moveTo(x, y);
        }
      }
    }
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ position: "fixed", top: 0, left: 0, touchAction: "none" }}
      />
      <div
        style={{ position: "absolute", top: "10px", left: "10px", zIndex: 1 }}
      >
        <label>
          Color:
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </label>
        <label>
          Line Width:
          <input
            type="number"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
          />
        </label>
        <label>
          Eraser:
          <input
            type="checkbox"
            checked={eraser}
            onChange={(e) => setEraser(e.target.checked)}
          />
        </label>
        <button
          onClick={() =>
            context?.clearRect(0, 0, window.innerWidth, window.innerHeight)
          }
        >
          Clear Canvas
        </button>
      </div>
    </div>
  );
};

export default DrawingBoard;
