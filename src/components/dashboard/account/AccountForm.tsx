import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { AccounFormProps } from "../../../@types/Accounts";
import useToast from "../../hooks/useToast";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import {
  accountSchemaType,
  acountSchema,
} from "../../../validations/Account.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { DynamicData } from "../../../@types/DynamicData";
import FormInput from "../../Forms/InputText";
import Button from "../../buttons/Button";
import IconLoader from "../../Loaders/IconLoader";
import {
  addAccount,
  manipulateAddedAccount,
  manipulateUpdatedAccount,
  updateAccount,
} from "../../../redux/features/AccountSlice";

const AccountForm: React.FC<AccounFormProps> = ({ accountData, onClose }) => {
  console.log(accountData);
  const { showErrorMessage, showSuccessMessage } = useToast();
  const { isLoading } = useAppSelector((state) => state.accounts);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<accountSchemaType>({ resolver: zodResolver(acountSchema) });

  const handlePropagation = (event: DynamicData) => {
    event?.stopPropagation();
  };

  useEffect(() => {
    if (accountData) {
      setValue("id", accountData.id);
      setValue("name", accountData.name);
      setValue("type", accountData.type);
    }
  }, [accountData, setValue]);

  const onSubmit: SubmitHandler<accountSchemaType> = async (
    data: accountSchemaType
  ) => {
    try {
      let res;
      if (accountData) {
        res = await dispatch(updateAccount(data)).unwrap();
        dispatch(manipulateUpdatedAccount(res.data));
      } else {
        res = await dispatch(addAccount(data)).unwrap();
        dispatch(manipulateAddedAccount(res.data));
      }
      showSuccessMessage(res.message);
      onClose();
    } catch (error) {
      const err = error as DynamicData;
      showErrorMessage(
        err?.data?.message ||
          err?.message ||
          "Unknown error occured! Please try again!"
      );
    }
  };
  return (
    <div
      onClick={onClose}
      className="absolute top-0 left-0 w-full h-screen flex items-center justify-center backdrop-blur-sm bg-[#4A677C]/50 z-40"
    >
      <div
        onClick={handlePropagation}
        className="relative bg-neutral-white p-8 mobile:p-12 h-2/5 tablet:h-[35%] ipad:h-2/5 w-[90%] mobile:w-2/5 tablet:w-[70%] laptop:w-2/5 rounded-xl min-w-fit"
      >
        <button
          onClick={onClose}
          className="absolute -top-1 -right-1 bg-action-error rounded-full py-1 px-3 text-lg text-neutral-white"
        >
          X
        </button>
        <h1 className=" text-center text-[#256490] font-medium">
          {accountData ? "Update category" : "Add category"}
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="justify-between flex flex-col gap-4 mobile:gap-3"
        >
          <div>
            <label htmlFor="deliveryDate" className="block text-sm font-medium">
              Name:
            </label>
            <FormInput
              type="text"
              placeholder="Category name"
              {...register("name")}
              error={errors.name}
              otherStyles=" bg-neutral-white mt-1 block w-full pl-3 pr-10 py-1 mobile:py-2 tablet:py-4 laptop:py-2 text-base border-2 mobile:text-sm rounded-md"
            />
          </div>
          <div>
            <label htmlFor="deliveryDate" className="block text-sm font-medium">
              Type:
            </label>
            <FormInput
              type="text"
              placeholder="Category description"
              {...register("type")}
              error={errors.type}
              otherStyles=" bg-neutral-white mt-1 block w-full pl-3 pr-10 py-1 mobile:py-2 tablet:py-4 laptop:py-2 text-base border-2 mobile:text-sm rounded-md"
            />
          </div>
          <Button
            url={null}
            buttonType="submit"
            title={
              isLoading ? (
                <>
                  <IconLoader className="animate-spin mr-1" />{" "}
                  {"Processing...."}
                </>
              ) : accountData ? (
                "Update"
              ) : (
                "Add"
              )
            }
            color={`${
              accountData
                ? "bg-action-success"
                : "bg-custom-gradient hover:scale-105"
            }`}
            otherStyles=" ipad:h-10 tablet:h-12 rounded-md w-full font-medium"
          />
        </form>
      </div>
    </div>
  );
};

export default AccountForm;
