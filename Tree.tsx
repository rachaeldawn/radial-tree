import { useState } from 'react';
import React from 'react';

interface IRadialNode {
  parent?: IRadialNode;
  children?: IRadialNode[];
}

interface IRadialProps {
  points: number;
  radius?: number;
  padding?: number;
  width?: number;
  height?: number;

  stroke?: string;
  outerFill?: string;
  innerFill?: string;
  center?: boolean;
  rotate?: number;
}

export default function Radial(props: IRadialProps): JSX.Element {
  const padding = props?.padding || 10;
  const points = props?.points || 4;
  const radius = (props?.radius || 50) + padding;
  const width = props?.width ?? 256;
  const height = props?.width ?? 256;
  const stroke = props?.stroke || '#60bdff';
  const innerFill = props?.innerFill ?? '#b2e6ff';
  const outerFill = props?.outerFill ?? '#b2e6ff';
  const includeCenter = props?.center ?? true;
  const rotate = props?.rotate ?? 0;

  const point = (index?: number) => {
    const twoPi = Math.PI * 2;
    const rad = twoPi * ((index + 1) / points);
    var x = (radius - padding) * Math.sin(rad);
    var y = (radius - padding) * Math.cos(rad);

    return (
      <React.Fragment>
        <line x1={0} x2={x} y1={0} y2={y} stroke={stroke} />
        <circle
          r="5"
          cx={x}
          cy={y}
          stroke={stroke}
          className="point"
          fill={outerFill}
        />
      </React.Fragment>
    );
  };

  const pointEls = Array.from(Array(points)).map((_, i) => point(i));

  const wh = radius * 2;
  const mins = -1 * radius;
  const viewBox = `${mins} ${mins} ${wh} ${wh}`;

  const centerEl = (
    <circle r={10} fill={innerFill} stroke={stroke} className="center" />
  );
  if (includeCenter) pointEls.push(centerEl);

  return (
    <svg
      viewBox={viewBox}
      width={width}
      height={height}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <g>{pointEls}</g>
    </svg>
  );
}
