import { Container } from "@pixi/react";

interface IProps {
  x: number;
  y: number;
  scale?: number;
  children: React.ReactNode;
}

export function Group({ x, y, children, scale = 1 }: IProps) {
  return (
    <Container x={x} y={y}>
      {scale !== 1 ? (
        <Container x={0} y={0} scale={scale}>
          {children}
        </Container>
      ) : (
        children
      )}
    </Container>
  );
}
