import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useErrors = (errors = []) => {
  useEffect(() => {
    errors.map(({ isError, error, fallback }) => {
      if (isError) {
        if (fallback) fallback();
        toast.error(error?.data?.message || "An error occurred");
      }
    });
  }, [errors]);
};

export const useAsyncMutation = (mutationHook) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const [mutate] = mutationHook();

  const executeMutation = async (toastMessage, ...args) => {
    console.log("mutation called with args",args)
    setIsLoading(true);
    const toastId = toast.loading(toastMessage || 'Performing Action');
    try {
      const res = await mutate(...args);
      if (res.data) {
        setData(res.data);
        toast.success(res.data.message, {id:toastId});
      } else {
        toast.error(res?.error?.data?.message || "Something went wrong", {id : toastId});
      }
    } catch (error) {
      toast.error("Something went wrong", {id : toastId});
    } finally {
      setIsLoading(false);
    }
  };

  return [executeMutation, isLoading, data];
};
