import { useState } from "react";
import type { MouseEventHandler } from "react";
import { Inter } from "next/font/google";
import { LazyImage } from "../../components/LazyImage";
import { NextPage } from "next";

const inter = Inter({ subsets: ["latin"] });

//generates a random number between 1 and 123
const randomFox = (): number => Math.floor(Math.random() * 123) + 1;

//generates simple unique id
const generateId = (): string => Math.random().toString(36).substr(2, 9);



export default function Home(): JSX.Element {
  const [images, setImages] = useState<Array<IImageItem>>([]);

const addNewImage: MouseEventHandler<HTMLButtonElement> = () => {
  const newImage: IImageItem = {
    id: generateId(),
    url: `https://randomfox.ca/images/${randomFox()}.jpg`
  };
  setImages([...images, newImage]);
}

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Platzi: Curso de React.js con TypeScript </h1>
      <button onClick={addNewImage}>Add new image</button>
      {images.map(({ id, url }, index) => (
        <div key={id} className="flex flex-col items-center justify-center">
          <LazyImage
            alt="Fox"
            width={320}
            height="auto"
            src={url}
            className="rounded"
            onLazyLoad={(img) => {
              console.log(`Image #${index + 1} loaded. Node:`, img);
            }}
          />
        </div>
      ))}
    </main>
  );
}
