import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { RegInputs } from '../../interfaces/inputs';
import { setIsLoading } from '../../store/slices/loading-slice';
import { AppDispatch, RootState } from '../../store/store';
import { createUser } from '../../store/thunks';

import { RegExist } from './modals/reg-exist';
import { RegFail } from './modals/reg-fail';
import { RegSuccess } from './modals/reg-success';
import { Step1 } from './steps/step1';
import { Step2 } from './steps/step2';
import { Step3 } from './steps/step3';

import './auth.scss';

export const SignIn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, code } = useSelector((state: RootState) => state.registration);

  const [step, setStep] = useState(1);

  const form = useForm<RegInputs>({
    mode: 'all',
  });

  const { handleSubmit, reset, getValues } = form;

  const otherCode = code && code !== 200 && code !== 400;

  const stepWidth = 528;
  const stepMargin = 200;
  const stepStyle = { minWidth: stepWidth, marginRight: stepMargin };

  useEffect(() => {
    if (loading === 'pending') dispatch(setIsLoading(true));
    if (loading === 'failed') dispatch(setIsLoading(false));
    if (loading === 'succeeded') dispatch(setIsLoading(false));

    if (code) setStep(1);
    if (code === 400) reset();
  }, [code, dispatch, loading, reset]);

  const onSubmit = (data: RegInputs) => {
    if (Object.keys(data).length < 6) {
      setStep(step + 1);

      return;
    }

    dispatch(createUser(data));
  };

  return (
    <Fragment>
      {code === 200 && <RegSuccess />}
      {code === 400 && <RegExist />}
      {otherCode && <RegFail handleSubmit={() => onSubmit(getValues())} />}

      <form className='auth__form' data-test-id='register-form' onSubmit={handleSubmit(onSubmit)}>
        <div className='form-container' style={{ right: `${(stepWidth + stepMargin) * (step - 1)}px` }}>
          <Step1 stepStyle={stepStyle} form={form} />
          {step >= 2 && <Step2 stepStyle={stepStyle} form={form} />}
          {step >= 3 && <Step3 stepStyle={stepStyle} form={form} />}
        </div>
      </form>
    </Fragment>
  );
};
