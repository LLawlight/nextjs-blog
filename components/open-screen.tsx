import { useEffect, useState } from "react";
import { siteTitle } from "../components/layout";

let hasShown = false;

export default function OpenScreen() {
  const [shouldShow] = useState(!hasShown);

  useEffect(() => {
    if (shouldShow) {
      render();
      hasShown = true;
    }
  }, [shouldShow]);

  if (!shouldShow) {
    return null;
  }

  return (
    <div className="open-screen">
      <canvas className="logo" width="300" height="300"></canvas>
      <p className="title">{siteTitle}</p>
      <style jsx>{`
        .open-screen {
          position: fixed;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: black;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
        }

        .logo {
          background: black;
          width: 300px;
          height: 300px;
        }

        .title {
          margin: 0;
          font-size: 60px;
          opacity: 0;
        }

        .title.animation {
          transition: all 6s;
          opacity: 1;
        }

        .hidden {
          transition: all 1.8s;
          visibility: hidden;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

function render() {
  setTimeout(() => {
    document.querySelector(".title").className =
      document.querySelector(".title").className + " animation";
  }, 300);

  const canvas = document.querySelector(".logo") as HTMLCanvasElement;
  const canvasHeight = canvas.height;
  const canvasWidth = canvas.width;
  const centerPointX = canvasWidth / 2;
  const centerPointY = canvasHeight / 2;
  const logoHeight = canvasHeight * 0.8;
  const logoPointOffset = logoHeight / 2 / Math.sqrt(2);
  const pathLength = logoHeight * 2 + logoPointOffset * 5;
  const time = 6;
  const speed = pathLength / time / 60;
  const speedArc = 2 / time / 60;

  let offset = 0;
  let step = 1;
  let offsetArc = 0;

  let flag = false;
  let timer = null;

  draw();

  function draw() {
    if (!flag) {
      flag = true;
    }

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.lineWidth = 6;
    ctx.strokeStyle = "white";
    ctx.lineJoin = "round";

    ctx.beginPath();

    ctx.moveTo(centerPointX, centerPointY);

    if (step == 1 || step == 3 || step == 5) {
      offset = offset + speed / Math.sqrt(2);
    } else {
      offset = offset + speed;
    }

    if (step == 1) {
      if (offset >= logoPointOffset) {
        offset = logoPointOffset;
      }

      ctx.lineTo(centerPointX + offset, centerPointY - offset);

      if (offset == logoPointOffset) {
        offset = 0;
        step++;
      }
    } else if (step == 2) {
      if (offset >= 2 * logoPointOffset) {
        offset = 2 * logoPointOffset;
      }

      ctx.lineTo(
        centerPointX + logoPointOffset,
        centerPointY - logoPointOffset
      );
      ctx.lineTo(
        centerPointX + logoPointOffset - offset,
        centerPointY - logoPointOffset
      );

      if (offset == 2 * logoPointOffset) {
        offset = 0;
        step++;
      }
    } else if (step == 3) {
      if (offset >= 2 * logoPointOffset) {
        offset = 2 * logoPointOffset;
      }

      ctx.lineTo(
        centerPointX + logoPointOffset,
        centerPointY - logoPointOffset
      );
      ctx.lineTo(
        centerPointX - logoPointOffset,
        centerPointY - logoPointOffset
      );
      ctx.lineTo(
        centerPointX - logoPointOffset + offset,
        centerPointY - logoPointOffset + offset
      );

      if (offset == 2 * logoPointOffset) {
        offset = 0;
        step++;
      }
    } else if (step == 4) {
      if (offset >= 2 * logoPointOffset) {
        offset = 2 * logoPointOffset;
      }

      ctx.lineTo(
        centerPointX + logoPointOffset,
        centerPointY - logoPointOffset
      );
      ctx.lineTo(
        centerPointX - logoPointOffset,
        centerPointY - logoPointOffset
      );
      ctx.lineTo(
        centerPointX + logoPointOffset,
        centerPointY + logoPointOffset
      );
      ctx.lineTo(
        centerPointX + logoPointOffset - offset,
        centerPointY + logoPointOffset
      );

      if (offset == 2 * logoPointOffset) {
        offset = 0;
        step++;
      }
    } else if (step == 5) {
      if (offset >= logoPointOffset) {
        offset = logoPointOffset;
      }

      ctx.lineTo(
        centerPointX + logoPointOffset,
        centerPointY - logoPointOffset
      );
      ctx.lineTo(
        centerPointX - logoPointOffset,
        centerPointY - logoPointOffset
      );
      ctx.lineTo(
        centerPointX + logoPointOffset,
        centerPointY + logoPointOffset
      );
      ctx.lineTo(
        centerPointX - logoPointOffset,
        centerPointY + logoPointOffset
      );
      ctx.lineTo(
        centerPointX - logoPointOffset + offset,
        centerPointY + logoPointOffset - offset
      );

      if (offset == logoPointOffset) {
        offset = 0;
        step++;
      }
    } else if (step == 6) {
      if (offset >= logoPointOffset) {
        offset = logoPointOffset;
      }

      ctx.lineTo(
        centerPointX + logoPointOffset,
        centerPointY - logoPointOffset
      );
      ctx.lineTo(
        centerPointX - logoPointOffset,
        centerPointY - logoPointOffset
      );
      ctx.lineTo(
        centerPointX + logoPointOffset,
        centerPointY + logoPointOffset
      );
      ctx.lineTo(
        centerPointX - logoPointOffset,
        centerPointY + logoPointOffset
      );
      ctx.lineTo(centerPointX, centerPointY);
      ctx.lineTo(centerPointX, centerPointY + offset);

      if (offset == logoPointOffset) {
        offset = 0;
        step++;
      }
    } else {
      ctx.lineTo(
        centerPointX + logoPointOffset,
        centerPointY - logoPointOffset
      );
      ctx.lineTo(
        centerPointX - logoPointOffset,
        centerPointY - logoPointOffset
      );
      ctx.lineTo(
        centerPointX + logoPointOffset,
        centerPointY + logoPointOffset
      );
      ctx.lineTo(
        centerPointX - logoPointOffset,
        centerPointY + logoPointOffset
      );
      ctx.lineTo(centerPointX, centerPointY);
      ctx.lineTo(centerPointX, centerPointY + logoPointOffset);
    }

    ctx.stroke();

    offsetArc = offsetArc + speedArc;

    if (offsetArc >= 2) {
      offsetArc = 2;
    }

    ctx.beginPath();
    ctx.arc(
      centerPointX,
      centerPointY,
      logoHeight / 2,
      0,
      Math.PI * offsetArc,
      false
    );
    ctx.stroke();

    ctx.beginPath();
    let bigOffetArc = Math.PI;
    if (offsetArc <= 1) {
      bigOffetArc = Math.PI + Math.PI * offsetArc;
    } else {
      bigOffetArc = (offsetArc - 1 - 0.0000001) * Math.PI;
    }
    ctx.arc(
      centerPointX,
      centerPointY,
      canvasHeight / 2 - ctx.lineWidth / 2,
      Math.PI,
      bigOffetArc,
      false
    );
    // ctx.arc(centerPointX, centerPointY, canvasHeight / 2 - ctx.lineWidth / 2, Math.PI, Math.PI * (1 - 0.0000001), false);

    ctx.stroke();

    if (step >= 7 && offsetArc >= 2) {
      // ctx.beginPath();
      // ctx.arc(centerPointX, centerPointY, canvasHeight / 2 - ctx.lineWidth / 2, 0, Math.PI * 2, false);
      // ctx.stroke();
      clearTimeout(timer);
      (document.querySelector(".open-screen") as HTMLDivElement).className =
        (document.querySelector(".open-screen") as HTMLDivElement).className +
        " hidden";
    } else {
      timer = setTimeout(() => {
        draw();
      }, 1000 / 60);
    }
  }
}
