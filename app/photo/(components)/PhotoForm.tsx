"use client";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { PhotoFormProps, FileWithPreview } from "@/types/types";
import { Text } from "@/components/common/Text";
import { Calendar } from "./Calendar";
import { Input } from "@/components/common/Input";
import { WhiteButton } from "@/components/common/WhiteButton";
import { ImageUploader } from "./ImageUploader";
import {
  createAllPresignedURLs,
  createPresignedURL,
} from "@/apis/axios/createPresignedURL";

export default function PhotoForm() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm<PhotoFormProps>();
  // const [imageDate, setImageDate] = useState(new Date());
  const [filesAndPreviews, setFilesAndPreviews] = useState<FileWithPreview[]>(
    [],
  );
  const { accessToken } = useAppSelector((state) => state.accessToken);

  const onSubmit = handleSubmit(async (data) => {
    // event.preventDefault();
    console.log(data);
    const filenames = filesAndPreviews.map((item) => item.file.name);

    // await createPresignedURL({ filename, accessToken });
    const presURLs = await createAllPresignedURLs({ filenames, accessToken });
    console.log(presURLs);
  });

  return (
    <form noValidate className="w-11/12 h-full pb-8 " onSubmit={onSubmit}>
      <Text text="사진" type="essential" />
      <ImageUploader
        register={register}
        filesAndPreviews={filesAndPreviews}
        setFilesAndPreviews={setFilesAndPreviews}
      />
      <Text text="포스트 이름" type="essential" />
      <Input
        placeholder="사진 속 장소는 어디인가요? ex. 강문해변, 광안리"
        register={register}
        name="title"
        rules={{
          required: "포스트 이름을 입력해주세요",
          pattern: {
            value: /^[^\s]{2,10}$/,
            message: "장소 이름은 최소 2글자에서 최대 10글자여야 합니다.",
          },
        }}
      />
      <Text text="주소" type="essential" />
      <Input
        placeholder="사진 속 주소는 어디인가요? ex. 강문해변, 광안리"
        name="taken_photo_address"
        register={register}
        rules={{
          required: "주소를 입력해주세요",
        }}
      />
      <Text text="날짜" type="essential" />
      <Controller
        control={control}
        name="taken_photo_date"
        render={({ field }) => (
          <Calendar
            selectedDate={field.value}
            setSelectedDate={field.onChange}
          />
        )}
      />
      <Text text="메모" />
      <Input
        placeholder="사진 속 장소에서의 추억을 자유롭게 적어주세요 !"
        register={register}
        name="memo"
        rules={{ maxLength: 100 }}
        classNames="text-start h-28"
      />
      <WhiteButton
        text="등록"
        classNames="absolute top-24 right-14 hover:border-none shadow hover:bg-primary-6 hover:text-white transition-colors duration-150 ease-in-out"
      />
    </form>
  );
}
