"use client";

import { ButtonProps } from "@/types/types";
import { useCallback } from "react";
import Image from "next/image";

export const WhiteButton = ({
  text,
  onClick,
  image,
  classNames,
  imageWidth,
  imageHeight,
}: ButtonProps) => {
  const onClickCallback = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(() => onClick && onClick(), [onClick]);
  return (
    <button
      className={`flex justify-center item-center text-sm font-semibold text-center text-primary-6 w-28 px-1 py-1 rounded-md bg-white border-solid border-[1px] border-primary-6  cursor-pointer ${classNames}`}
      onClick={onClickCallback}
    >
      {image && (
        <Image
          width={imageWidth}
          height={imageHeight}
          src={image}
          alt={image}
          priority
        />
      )}
      {text}
    </button>
  );
};
