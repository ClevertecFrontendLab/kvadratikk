import { Fragment, useEffect, useState } from 'react';
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

const emptyForm = {
  login: '',
  name: '',
  password: '',
  tel: '',
  email: '',
  surname: '',
};

export const SignIn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, code } = useSelector((state: RootState) => state.registration);

  const [step, setStep] = useState(1);
  const [formValues, setFormValues] = useState<RegInputs>(emptyForm);

  const otherCode = code && code !== 200 && code !== 400;

  const stepWidth = 528;
  const stepMargin = 200;
  const stepStyle = { minWidth: stepWidth, marginRight: stepMargin };

  useEffect(() => {
    if (loading === 'pending') dispatch(setIsLoading(true));
    if (loading === 'failed') dispatch(setIsLoading(false));
    if (loading === 'succeeded') dispatch(setIsLoading(false));

    if (code) setStep(1);
    if (code === 400) setFormValues(emptyForm);
  }, [code, dispatch, loading]);

  const onSubmit = (data: RegInputs) => {
    dispatch(createUser(data));
  };

  return (
    <Fragment>
      {code === 200 && <RegSuccess />}
      {code === 400 && <RegExist />}
      {otherCode && <RegFail handleSubmit={() => onSubmit(formValues)} />}

      <div className='auth__form'>
        <div className='form-container' style={{ right: `${(stepWidth + stepMargin) * (step - 1)}px` }}>
          <Step1
            stepStyle={stepStyle}
            setStep={setStep}
            step={step}
            formValues={formValues}
            setFormValues={setFormValues}
          />
          <Step2
            stepStyle={stepStyle}
            setStep={setStep}
            step={step}
            formValues={formValues}
            setFormValues={setFormValues}
          />
          <Step3 stepStyle={stepStyle} formValues={formValues} setFormValues={setFormValues} />
        </div>
      </div>
    </Fragment>
  );
};
