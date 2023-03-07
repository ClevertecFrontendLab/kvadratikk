import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Inputs } from '../../interfaces/inputs';

import { Step1 } from './steps/step1';
import { Step2 } from './steps/step2';
import { Step3 } from './steps/step3';

import './log-in.scss';

export const SignIn = () => {
  const [step, setStep] = useState(1);
  const stepWidth = 528;
  const stepMargin = 200;
  const stepStyle = { minWidth: stepWidth, marginRight: stepMargin };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'all',
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <form className='sign-in__form' onSubmit={handleSubmit(onSubmit)}>
      <div className='form-container' style={{ right: `${(stepWidth + stepMargin) * (step - 1)}px` }}>
        <Step1 stepStyle={stepStyle} register={register} errors={errors} setStep={setStep} step={step} watch={watch} />
        <Step2 stepStyle={stepStyle} register={register} errors={errors} setStep={setStep} step={step} watch={watch} />
        <Step3 stepStyle={stepStyle} register={register} errors={errors} watch={watch} setValue={setValue} />
      </div>
    </form>
  );
};
