import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "../instance";

const deletePhoto = async (photoId: number) => {
  const { data } = await axiosInstance.delete(`/photos/${photoId}`);
  return data;
};

export const useDeletePhotoMutation = (
  options: { onSuccess: () => void } | undefined,
) => {
  const queryClient = useQueryClient();
  return useMutation(deletePhoto, {
    onSuccess: () => {
      if (options && options.onSuccess) {
        options.onSuccess();
      }
      queryClient.invalidateQueries(["PHOTOS"]);
    },
    onError: (err) => {
      console.log("에러!:: ", err);
    },
  });
};
