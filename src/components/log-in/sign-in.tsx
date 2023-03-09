import { Fragment, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { Inputs } from '../../interfaces/inputs';
import { setIsLoading } from '../../store/slices/loading-slice';
import { setCode } from '../../store/slices/registration-slice';
import { AppDispatch, RootState } from '../../store/store';
import { createUser } from '../../store/thunks';

import { RegExist } from './modals/reg-exist';
import { RegFail } from './modals/reg-fail';
import { RegSuccess } from './modals/reg-success';
import { Step1 } from './steps/step1';
import { Step2 } from './steps/step2';
import { Step3 } from './steps/step3';

import './log-in.scss';

export const SignIn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, code } = useSelector((state: RootState) => state.registration);

  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(code === 200);
  const [isExist, setIsExist] = useState(code === 400);
  const [isFail, setIsFail] = useState(Boolean(code && code !== 200 && code !== 400));

  const stepWidth = 528;
  const stepMargin = 200;
  const stepStyle = { minWidth: stepWidth, marginRight: stepMargin };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
    getValues,
  } = useForm<Inputs>({
    mode: 'all',
  });

  useEffect(() => {
    if (loading === 'pending') dispatch(setIsLoading(true));
    if (loading === 'failed') dispatch(setIsLoading(false));
    if (loading === 'succeeded') dispatch(setIsLoading(false));

    if (code) {
      setStep(1);

      if (code === 200) {
        setIsSuccess(true);
      } else if (code === 400) {
        setIsExist(true);
        reset();
      } else {
        setIsFail(true);
      }
    }

    dispatch(setCode(null));
  }, [code, dispatch, loading, reset]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(createUser(data));
  };

  return (
    <Fragment>
      {isSuccess && <RegSuccess setState={setIsSuccess} />}
      {isExist && <RegExist setState={setIsExist} />}
      {isFail && <RegFail setState={setIsFail} handleSubmit={() => onSubmit(getValues())} />}

      <form className='sign-in__form' onSubmit={handleSubmit(onSubmit)}>
        <div className='form-container' style={{ right: `${(stepWidth + stepMargin) * (step - 1)}px` }}>
          <Step1
            stepStyle={stepStyle}
            register={register}
            errors={errors}
            setStep={setStep}
            step={step}
            watch={watch}
          />
          <Step2
            stepStyle={stepStyle}
            register={register}
            errors={errors}
            setStep={setStep}
            step={step}
            watch={watch}
          />
          <Step3 stepStyle={stepStyle} register={register} errors={errors} watch={watch} setValue={setValue} />
        </div>
      </form>
    </Fragment>
  );
};
