import "../styles/event_registrations.css";
import { useRef, useState } from "react";
import styled from "styled-components";
import {
  InputBox,
  CloseMessage,
  Buttons,
  Dropdown,
  FileInputBox,
  RadioButtons,
  toast,
  NoteBox,
} from "../../index.js";
import {
  useRegisterStep1,
  useRegisterStep2,
  useRegisterStep3,
  useRegisterStep4,
} from "../../../hooks/events.hooks";
import {
  paymentLinks,
  projectDomains,
  projectTypes,
  localTypes,
  state_arr
} from "../../../static/data";

import payment_qr from "../../../assets/payment QR/payment_qr.jpg";

const MainContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 16px;
`;

const StepContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 70px;
  position: relative;
  :before {
    content: "";
    position: absolute;
    background: #f3e7f3;
    height: 4px;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }
  :after {
    content: "";
    position: absolute;
    background: #155e75;
    height: 4px;
    width: ${({ width }) => width};
    top: 50%;
    transition: 0.4s ease;
    transform: translateY(-50%);
    left: 0;
  }
`;

const StepWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const StepStyle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 3px solid
    ${({ step }) => (step === "completed" ? "#075985" : "#155e75")};
  transition: 0.4s ease;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StepCount = styled.span`
  font-size: 19px;
  color: #000000;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const StepsLabelContainer = styled.div`
  position: absolute;
  top: 66px;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StepLabel = styled.span`
  font-size: 19px;
  color: #155e75;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 -15px;
  margin-top: 100px;
`;

const ButtonStyle = styled.button`
  border-radius: 4px;
  border: 0;
  background: #155e75;
  color: #ffffff;
  cursor: pointer;
  padding: 8px;
  width: 90px;
  :active {
    transform: scale(0.98);
  }
  :disabled {
    background: #155e75;
    color: #000000;
    cursor: not-allowed;
  }
`;

const CheckMark = styled.div`
  font-size: 26px;
  font-weight: 600;
  color: #155e75;
  -ms-transform: scaleX(-1) rotate(-46deg); /* IE 9 */
  -webkit-transform: scaleX(-1) rotate(-46deg); /* Chrome, Safari, Opera */
  transform: scaleX(-1) rotate(-46deg);
`;

const steps = [
  {
    label: "Step1",
    step: 1,
  },
  {
    label: "Step2",
    step: 2,
  },
  {
    label: "Step3",
    step: 3,
  },
  {
    label: "Step4",
    step: 4,
  },
];
const totalSteps = steps.length;

const initialErrorsForm0 = {
  title: "",
  domain: "",
  project_type: "",
  guide_name: "",
  guide_email: "",
  guide_phone: "",
  hod_email: "",
  company: "",
  abstract: "",
  nda: "",
  sponsored: "",
};
const initialErrorsForm1 = {
  name: "",
  email: "",
  phone: "",
  gender: "",
  member_id: "",
};
const initialErrorsForm2 = {
  isPICT: "",
  isInternational: "",
  college: "",
  country: "",
  state: "",
  district: "",
  locality: "",
  mode: "",
  reason_of_mode: "",
  referral: "",
  year: "",
};

const initialErrorsForm3 = {
  payment_id: "",
};

const sponsor_arr = [
  {
    value: "1",
    label: "Yes",
    // onChange: function (e) { }
  },
  {
    value: "0",
    label: "No",
  },
];

const nda_arr = [
  {
    value: "1",
    label: "Yes",
    // onChange: function (e) { }
  },
  {
    value: "0",
    label: "No",
  },
];

const pict_arr = [
  {
    value: "1",
    label: "Yes",
    // onChange: function (e) { }
  },
  {
    value: "0",
    label: "No",
  },
];

const mode_arr = [
  {
    value: "1",
    label: "Offline",
    // onChange: function (e) { }
  },
  {
    value: "0",
    label: "Online",
  },
];
const country_arr = [
  {
    value: "1",
    label: "Yes",
    // onChange: function (e) { }
  },
  {
    value: "0",
    label: "No",
  },
];

const gender_type = [
  { value: "SEL", label: "Select", disabled: true },
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];

// const state_arr = [
//   { value: 'SEL', label: 'Select', disabled: true },
//   { value: 'AP', label: "Arunachal Pradesh" },
//   { value: 'AS', label: "Assam" },
//   { value: 'BI', label: "Bihar" },
//   { value: 'CH', label: "Chhattisgarh" },
//   { value: 'DEL', label: "Delhi" },
//   { value: 'G', label: "Goa" },
//   { value: 'GUJ', label: "Gujarat" },
//   { value: 'HAR', label: "Haryana" },
//   { value: 'HP', label: "Himachal Pradesh" },
//   { value: 'JK', label: "Jammu &amp; Kashmir" },
//   { value: 'JH', label: "Jharkhand" },
//   { value: 'KAR', label: "Karnataka" },
//   { value: 'KR', label: "Kerala" },
//   { value: 'MP', label: "Madhya Pradesh" },
//   { value: 'MAH', label: "Maharashtra" },
//   { value: 'MN', label: "Manipur" },
//   { value: 'MG', label: "Meghalaya" },
//   { value: 'MZ', label: "Mizoram" },
//   { value: 'OR', label: "Orissa" },
//   { value: 'PN', label: "Punjab" },
//   { value: 'RJ', label: "Rajasthan" },
//   { value: 'TN', label: "Tamil Nadu" },
//   { value: 'TL', label: "Telangana" },
//   { value: 'TR', label: "Tripura" },
//   { value: 'UP', label: "Uttar Pradesh" },
//   { value: 'UT', label: "Uttarakhand" },
//   { value: 'WB', label: "West Bengal" },

// ]



function TeamConcepts() {
  //form0
  const [activeStep, setActiveStep] = useState(1);
  const width = `${(100 / (totalSteps - 1)) * (activeStep - 1)}%`;
  const [form0, setForm0] = useState({
    title: "",
    domain: "",
    project_type: "",
    guide_name: "",
    guide_email: "",
    guide_phone: "",
    hod_email: "",
    company: "",
    abstract: "",
    nda: "0",
    sponsored: "0",
  });
  const [errors0, setErrors0] = useState(initialErrorsForm0);
  const registerUserMutationForm0 = useRegisterStep1(setErrors0, "concepts");
  const handleInputChange0 = (e) => {
    const { name, value } = e.target;
    setForm0((prevState) => {
      errors0[name] !== "" &&
        setErrors0((prevState) => ({ ...prevState, [name]: "" }));
      return { ...prevState, [name]: value };
    });
  };

  const handleSelectChange0 = (e) => {
    const { name, value } = e.target;
    setForm0((prevState) => {
      errors0[name] !== "" &&
        setErrors0((prevState) => ({ ...prevState, [name]: "" }));
      return { ...prevState, [name]: value };
    });
    //setForm0(form0);
  };

  //form1

  const [formFields, setFormFields] = useState([
    {
      name: "",
      email: "",
      phone: "",
      gender: "SEL",
      member_id: "",
    },
  ]);

  const handleImageChange = (event, index) => {
    const file = event.target.files[0];
    const maxSizeInBytes = 200 * 1024; // MAX 200 KB

    if (file.size > maxSizeInBytes) {
      toast.warn('Selected image size must be less than 200KB.');
      event.target.value = '';
      return;
    }

    let data = [...formFields];
    data[index][event.target.name] = event.target.files[0];
    setFormFields(data);
  };
  const [errors1, setErrors1] = useState(initialErrorsForm1);
  const registerUserMutationForm1 = useRegisterStep2(setErrors1, "concepts");

  const handleFormChange = (event, index) => {
    const { name, value } = event.target;
    setFormFields((prevState) => {
      errors1[name] !== "" &&
        setErrors1((prevState) => ({ ...prevState, [name]: "" }));
      let data = [...prevState];
      data[index][name] = value;
      return data;
    });
  };

  const handleSelectChange1 = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  };

  const addFields = () => {
    if (formFields.length < 6) {
      for (const property in formFields.at(-1)) {
        if (property === "name" && formFields.at(-1)[property] === "") {
          toast.warn("Please enter name");
          return;
        } else if (property === "email" && formFields.at(-1)[property] === "") {
          toast.warn("Please enter E-mail address");
          return;
        } else if (property === "phone" && formFields.at(-1)[property].length !== 10) {
          toast.warn("Please enter a valid phone number");
          return;
        } else if (property === "gender" && formFields.at(-1)[property] === "SEL") {
          toast.warn("Please enter your gender");
          return;
        } else if (property === "member_id" && formFields.at(-1)[property] === "") {
          toast.warn("Please upload the ID");
          return;
        }
      }

      const memberFormData = new FormData();
      memberFormData.append("member_id", formFields.at(-1).member_id);
      const tempMemberDetails = { ...formFields.at(-1) };
      delete tempMemberDetails.member_id;
      memberFormData.append("body", JSON.stringify(tempMemberDetails));
      registerUserMutationForm1.mutate(memberFormData, {
        onSuccess: () => {
          setErrors1(initialErrorsForm1);
          toast.success("Added member to the team !", { icon: "✅" });
          if (formFields.length < 5) {
            let object = {
              name: "",
              email: "",
              phone: "",
              gender: "SEL",
              member_id: "",
            };
            setFormFields([...formFields, object]);
            SetMemberCount((memberCount) => memberCount + 1);
          }
          if (formFields.length == 5) SetMemberCount((memberCount) => memberCount + 1);
        },
        onError: () => {
          if (formFields.length === 1) {
            return;
          }
          setFormFields((formFields) => formFields.slice(0, -1));
        },
      });
      return;
    }
    toast.warn("Maximum 5 members are allowed");
  };

  const removefields = (index) => {
    setFormFields((data) => data.slice(index, 1));
  };

  //form 2

  const [form2, setForm2] = useState({
    isPICT: "",
    isInternational: "",
    college: "",
    department: "",
    group_id: "",
    country: "",
    state: "",
    district: "",
    city: "",
    locality: "1",
    mode: "1",
    reason_of_mode: "",
    referral: "",

  });
  const [errors2, setErrors2] = useState(initialErrorsForm2);
  const registerUserMutationForm2 = useRegisterStep3(setErrors2, "concepts");

  const handleInputChange2 = (e) => {
    const { name, value } = e.target;
    // console.log(form2.group_id)

    if (name === "isPICT" && value === "1") {
      // console.log("is pict");
      setForm2((form2) => ({
        ...form2,
        isPICT: "1",
        college: "Pune Institute Of Computer Technology",
        country: "India",
        department: "",
        city: "Pune",
        state: "Maharashtra",
        district: "Pune",
        locality: "1",
        mode: "1",
        reason_of_mode: "",
        isInternational: "0",
      }));
      // setPaymentStatus(true);
    } else if (name === "isPICT" && value === "0") {
      setForm2((form2) => ({
        ...form2,
        isPICT: "0",
        college: "",
        department: "",
        group_id: "",
        country: "",
        state: "",
        city: "",
        district: "",
        locality: "",
        isInternational: "",
      }));
    } else if (name === "isInternational" && value === "0") {
      setForm2((form2) => ({
        ...form2,
        country: "India",
        isPICT: "0",
        [name]: value,
      }));
      setPaymentStatus(false);
    } else if (name === "isInternational" && value === "1") {
      setForm2((form2) => ({
        ...form2,
        country: "",
        isPICT: "0",
        [name]: value,
      }));
      setPaymentStatus(true);
    } else {
      setForm2((prevState) => {
        errors2[name] !== "" &&
          setErrors2((prevState) => ({ ...prevState, [name]: "" }));
        return { ...prevState, [name]: value };
      });
      setPaymentStatus(false);
    }
    // console.log(form2)
  };
  const handleDeptChange = (e) => {

    const { name, value } = e.target;
    // console.log(name, value)
    if (name === "department" && value === 0) {
      setForm2((form2) => ({
        ...form2,
        isPICT: "1",
        college: "Pune Institute Of Computer Technology",
        department: "0",
        group_id: "",
        country: "India",
        city: "Pune",
        state: "Maharashtra",
        district: "Pune",
        locality: "1",
        mode: "1",
        reason_of_mode: "",
        isInternational: "0",
      }));
    } else if (name === "department" && value === 1) {
      setForm2((form2) => ({
        ...form2,
        isPICT: "1",
        college: "Pune Institute Of Computer Technology",
        department: "1",
        group_id: "",
        country: "India",
        city: "Pune",
        state: "Maharashtra",
        district: "Pune",
        locality: "1",
        mode: "1",
        reason_of_mode: "",
        isInternational: "0",
      }));
    } else if (name === "department" && value === 2) {
      setForm2((form2) => ({
        ...form2,
        isPICT: "1",
        college: "Pune Institute Of Computer Technology",
        department: "2",
        group_id: "",
        country: "India",
        city: "Pune",
        state: "Maharashtra",
        district: "Pune",
        locality: "1",
        mode: "1",
        reason_of_mode: "",
        isInternational: "0",
      }));
    }

    setPaymentStatus(true);
  }

  const handleGroupIDChange = (e) => {
    const { name, value } = e.target;
    setForm2((form2) => ({
      ...form2,
      [name]: value
    }));
    setPaymentStatus(true);
  }

  const dept_arr = [
    {
      value: "0",
      label: "Computer",
      onChange: handleDeptChange
    },
    {
      value: "1",
      label: "IT",
      onChange: handleDeptChange
    },
    {
      value: "2",
      label: "EnTC",
      onChange: handleDeptChange
    },
  ];


  const country_arr = [
    {
      value: "1",
      label: "Yes",
      onChange: handleInputChange2
    },
    {
      value: "0",
      label: "No",
      onChange: handleInputChange2
    },
  ];


  const handleSelectChange2 = (e) => {
    const { name, value } = e.target;
    setForm2((prevState) => {
      errors2[name] !== "" &&
        setErrors2((prevState) => ({ ...prevState, [name]: "" }));
      return { ...prevState, [name]: value };
    });
  };

  //form 3
  const [paymentStatus, setPaymentStatus] = useState(true);
  const paymentRef = useRef("");
  const [errors3, setErrors3] = useState(initialErrorsForm3);
  const registerUserMutationForm3 = useRegisterStep4(setErrors3, "concepts");

  //steps for whole form
  const [formStep, setFormStep] = useState(0);

  const prevForm = (e) => {
    // e.preventDefault();
    setFormStep((currentStep) => currentStep - 1);
    setActiveStep(activeStep - 1);
  };

  const [memberCount, SetMemberCount] = useState(0);

  const nextForm = (e) => {
    e.preventDefault();

    if (formStep === 0) {
      // console.log("form0", form0);
      for (const property in form0) {
        if (form0[property] === "") {
          if (property === "company" && form0["sponsored"] === "0") continue;
          if (property === "nda" && form0["sponsored"] === "0") continue;
          else {
            toast.warn("Please enter all fields!");
            return;
          }
        }
      }
      registerUserMutationForm0.mutate(form0, {
        onSuccess: () => {
          setErrors0(initialErrorsForm0);
          toast.success("Completed Step 1️⃣ !", { icon: "✅" });
          setFormStep((currentStep) => currentStep + 1);
          setActiveStep((activeStep) => activeStep + 1);
          return;
        },
      });
    }
    if (formStep === 1) {
      if (memberCount < 2) {
        toast.warn("At least two member needed!");
        return;
      }

      setFormStep((currentStep) => currentStep + 1);
      setActiveStep((activeStep) => activeStep + 1);
    }
    if (formStep === 2) {
      // console.log(form2);
      for (const property in form2) {
        if (form2[property] === "") {
          if (property === "reason_of_mode" && form2["mode"] === "1") continue;
          else if (property === "referral") continue;
          else if (property === "department") continue;
          // console.log(property)
          toast.warn("Please enter all fields!");
          return;
        }
      }
      registerUserMutationForm2.mutate(form2, {

        onSuccess: () => {
          setErrors2(initialErrorsForm2);
          if (form2.isPICT === "1" || form2.isInternational === "1") {
            const temp =
              form2.isPICT === "1" ? { isPICT: "1" } : { isInternational: "1" };
            registerUserMutationForm3.mutate(temp, {
              onSuccess: () => {
                toast.success("Completed Registration !", { icon: "✅" });
                setPaymentStatus(true);
                setFormStep((currentStep) => currentStep + 1);
                setActiveStep((activeStep) => activeStep + 1);
              },
            });
          } else {
            toast.success("Completed Step 3️⃣ !", { icon: "✅" });
            // const win = window.open(paymentLinks.get("concepts"), "_blank");
            setFormStep((currentStep) => currentStep + 1);
            setActiveStep((activeStep) => activeStep + 1);
            // win.focus();
          }
        },
      });
    }
    if (formStep === 3) {
      if (paymentRef.current.value.length != 12) {
        toast.warn("Please enter valid 12 digit Transaction ID!");
        return;
      }
      registerUserMutationForm3.mutate(
        { payment_id: paymentRef.current.value?.trim() },
        {
          onSuccess: () => {
            toast.success("Completed Step 4️⃣ !", { icon: "✅" });
            setActiveStep((activeStep) => activeStep + 1);
            setPaymentStatus(true);
          },
        }
      );
    }

  };

  //dropdown

  //const [option, setOption] = useState();

  return (
    <MainContainer>
      {true ?
        <>
          <StepContainer width={width}>
            {steps.map(({ step, label }) => (
              <StepWrapper key={step}>
                <StepStyle step={activeStep >= step ? "completed" : "incomplete"}>
                  {activeStep > step ? (
                    <CheckMark>L</CheckMark>
                  ) : (
                    <StepCount>{step}</StepCount>
                  )}
                </StepStyle>
                <StepsLabelContainer>
                  <StepLabel key={step}>{label}</StepLabel>
                </StepsLabelContainer>
              </StepWrapper>
            ))}
          </StepContainer>
          <div className="md:mx-16 my-6">
            <form className="rounded-lg px-8 pt-6 pb-8 mb-4 border">
              {/* form 0 */}
              {formStep === 0 && (
                <>
                  <InputBox
                    type="text"
                    label={"Project Title"}
                    name={"title"}
                    placeholder={"Project title"}
                    required
                    onChange={(e) => handleInputChange0(e)}
                    value={form0.title}
                    minlenght="10"
                    error={errors0.title}
                    tip={"The project title should be between 10 and 100 characters long.(both inclusive)"}
                  ></InputBox>

                  <Dropdown
                    label="Domain of the project"
                    options={[
                      { value: "SEL", label: "Select", selected: true },
                      ...projectDomains,
                    ]}
                    name={"domain"}
                    state={form0}
                    setState={setForm0}
                    required
                    error={errors0.domain}

                  />
                  <Dropdown
                    label=" Project Type"
                    options={[
                      { value: "SEL", label: "Select", selected: true },
                      ...projectTypes,
                    ]}
                    name={"project_type"}
                    state={form0}
                    setState={setForm0}
                    required
                    error={errors0.project_type}
                  />
                  <InputBox
                    type="text"
                    label={"Guide_Name"}
                    name={"guide_name"}
                    placeholder={"Name"}
                    onChange={(e) => handleInputChange0(e)}
                    required
                    value={form0.guide_name}
                    error={errors0.guide_name}
                    tip={"Guide name should be between 3 and 50 characters(both inclusive) long and contains only alphabetical characters."}
                  ></InputBox>
                  <InputBox
                    type="email"
                    label={"Guide_Email"}
                    name={"guide_email"}
                    placeholder={"Email"}
                    onChange={(e) => handleInputChange0(e)}
                    required
                    value={form0.guide_email}
                    error={errors0.guide_email}
                    tipstyle={"hidden"}
                  ></InputBox>
                  <InputBox
                    type="tel"
                    label={"Guide_Phone"}
                    name={"guide_phone"}
                    placeholder={"Phone"}
                    onChange={(e) => handleInputChange0(e)}
                    required
                    value={form0.guide_phone}
                    error={errors0.guide_phone}
                    tipstyle={"hidden"}
                  ></InputBox>
                  <InputBox
                    type="email"
                    label={"Hod_email"}
                    name={"hod_email"}
                    placeholder={"Hod email"}
                    required
                    onChange={(e) => handleInputChange0(e)}
                    value={form0.hod_email}
                    error={errors0.hod_email}
                    tipstyle={"hidden"}
                  ></InputBox>
                  <RadioButtons
                    label="Is the project sponsored or not?"
                    options={sponsor_arr}
                    state={form0}
                    setState={setForm0}
                    name="sponsored"
                    required
                    error={errors0.sponsored}
                  />
                  {form0.sponsored === "1" && (
                    <>
                      <InputBox
                        type="text"
                        label={"If yes, then name of company?"}
                        placeholder={"Company name"}
                        name={"company"}
                        required
                        onChange={(e) => handleInputChange0(e)}
                        value={form0.company}
                        error={errors0.company}
                        tip={"Company name if applicable, should be between 3 and 100 characters(both inclusive)"}
                      ></InputBox>
                      <RadioButtons
                        label=" NDA signed or not?"
                        options={nda_arr}
                        state={form0}
                        setState={setForm0}
                        name="nda"
                        required
                        error={errors0.nda}
                      />
                    </>
                  )}

                  <InputBox
                    type="textarea"
                    label={"Abstract"}
                    name={"abstract"}
                    placeholder={"In 1000 characters or less"}
                    required
                    error={errors0.abstract}
                    onChange={(e) => handleInputChange0(e)}
                    value={form0.abstract}
                    minlenght="50"
                    tip={"Abstract should be between 50 and 1000 characters long(both inclusive)"}
                  ></InputBox>
                </>
              )}
              {/* form 1 */}
              {formStep === 1 && (
                <>
                  <NoteBox
                    title="Note"
                    text="After filling details of each member click the Add members button to add the details and then you can also add more members."
                  />

                  {formFields.map((form, index) => {
                    return (
                      <>
                        <h1 className="input-label font-medium text-white border-red-500 p-2 w-28 border-2 text-lg after:ml-0.5 after:text-gold rounded-md shadow-md bg-gradient-to-r from-yellow-300 to-yellow-500 text-center my-2">
                          Member {index + 1}
                        </h1>
                        <div key={index}>
                          <InputBox
                            label="Name"
                            name="name"
                            type="text"
                            placeholder="name "
                            required
                            error={errors1.name}
                            onChange={(event) => handleFormChange(event, index)}
                            value={form.name}
                            tip={"Name of member should be between 3 and 20 characters(both inclusive)"}
                          />
                          <InputBox
                            label="Email ID"
                            name="email"
                            type="text"
                            placeholder="email "
                            required
                            error={errors1.email}
                            onChange={(event) => handleFormChange(event, index)}
                            value={form.email}
                            tipstyle={"hidden"}
                          />
                          <div className="flex">
                            <div className="mr-1 w-1/2">
                              <InputBox
                                label="Phone No"
                                name="phone"
                                type="tel"
                                placeholder="phone number"
                                required
                                error={errors1.phone}
                                onChange={(event) => handleFormChange(event, index)}
                                value={form.phone}
                                tipstyle={"hidden"}
                              />
                            </div>
                            <div className="input-box-dropdown w-full mb-4 relative">
                              <label
                                className={`input-label font-medium mb-1 text-white text-lg flex`}
                              >
                                {"Gender"}
                                <h1 className="text-gold">*</h1>
                              </label>
                              <div className="relative inline-block w-full">
                                <select
                                  name={"gender"}
                                  value={formFields.gender}
                                  onChange={(event) => handleFormChange(event, index)}
                                  required
                                  error={errors1.gender}
                                  className={`w-full h-10 pl-4 pr-8 bg-[#0B1E47] text-base text-gold placeholder-gray-500 border rounded-lg appearance-none focus:outline-none focus:shadow-outline-blue`}
                                >
                                  {gender_type.map((option) => (
                                    <option
                                      key={option?.value}
                                      value={option?.value}
                                      className={`py-1 bg-[#0B1E47] ${option?.className || ""
                                        }`}
                                    >
                                      {option?.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            {/* <Dropdown
                                                  label=" Gender"
                                                  options={gender_type}
                                                  name={"gender"}
                                                  state={formFields}
                                                  setState={setFormFields}
                                                  required
                                              /> */}
                          </div>
                          <FileInputBox
                            name="member_id"
                            accept="image/png, image/jpeg"
                            type="file"
                            onChange={(e) => handleImageChange(e, index)}
                            label="Upload Screenshot of ID"
                            required
                            error={errors1.member_id}
                          />
                          <NoteBox title="please take note" text="accepted format: jpeg, png and less than 200kb" />
                          {/* <Notebox /> */}
                          {/* Button aligned to the right */}
                          {/* <Buttons
                          value="remove member"
                          onClick={() => removefields(index)}
                          classNames="my-2"
                          disabled={true}
                          loading={registerUserMutationForm1.isLoading}
                        /> */}

                          <hr className="my-5 border-dashed border-gold" />

                        </div>
                      </>
                    );
                  })}

                  {memberCount < 5 ? (
                    <>
                      <Buttons
                        value="Add Members"
                        onClick={addFields}
                        classNames=" my-2"
                        loading={registerUserMutationForm1.isLoading}
                      />
                    </>) : (<></>
                  )}


                </>
              )}
              {/* form 2 */}
              {formStep === 2 && (
                <>

                  <RadioButtons
                    label=" Are you PICTian ?"
                    options={country_arr}
                    state={form2}
                    setState={setForm2}
                    name="isPICT"
                    required
                    error={errors2.isPICT}
                  />


                  {form2.isPICT === "1" && <>
                    <RadioButtons
                      label="Department"
                      options={dept_arr}
                      state={form2}
                      setState={setForm2}
                      name="department"
                      required
                    // error={error}
                    />
                    <InputBox
                      label="Group ID"
                      name={"group_id"}
                      type="text"
                      placeholder="Enter your Group ID"
                      required
                      onChange={(e) => handleGroupIDChange(e)}
                      value={form2.group_id}
                      // error={errors2.group_id}
                      tip={"Alphanumeric Group ID can be between 3 and 100 characters(both inclusive) and can contain  value. "}
                    />
                  </>}

                  {form2.isPICT === "0" && (
                    <>
                      <RadioButtons
                        label="Is International ?"
                        options={country_arr}
                        state={form2}
                        setState={setForm2}
                        name="isInternational"
                        required
                        error={errors2.isInternational}
                      />
                      <div className=" mx-1 my-2">
                        <InputBox
                          label="College"
                          name={"college"}
                          type="text"
                          placeholder="college name"
                          required
                          onChange={(e) => handleInputChange2(e)}
                          value={form2.college}
                          error={errors2.college}
                          tip={"College name should be between 3 and 100 characters(both inclusive) and contains only alphabetical characters. "}
                        />
                      </div>
                      <div className="mx-1 my-2">
                        <InputBox
                          className={form2.isInternational === "0" ? "pointer-events-none" : ""}
                          label="Country"
                          name={"country"}
                          type="text"
                          placeholder="country"
                          readonly={form2.isInternational === "0"}
                          required
                          error={errors2.country}
                          onChange={(e) => handleInputChange2(e)}
                          value={
                            form2.isInternational === "0" ? "India" : form2.country
                          }
                          tip={"Country should be between 2 and 20 characters(both inclusive) and contains only alphabetical characters."}
                        />
                      </div>
                      <div className="flex mx-1 ">
                        <div className="mr-1 w-1/2 mt-1">
                          <Dropdown
                            label="State"
                            options={[
                              { value: "SEL", label: "Select", selected: true },
                              ...state_arr,
                            ]}
                            name={"state"}
                            state={form2}
                            setState={setForm2}
                            required
                          />
                        </div>
                        <div className="ml-1 w-1/2">
                          <InputBox
                            label="District"
                            name={"district"}
                            type="text"
                            placeholder="district"
                            required
                            error={errors2.district}
                            onChange={(e) => handleInputChange2(e)}
                            value={form2.district}
                            tip={"District should be between 2 and 20 characters(both inclusive) and contains only alphabetical characters."}
                          />
                        </div>
                      </div>
                      <div className="flex mx-1 ">
                        <div className="mr-1 w-1/2">
                          <InputBox
                            label="City"
                            type="text"
                            name={"city"}
                            placeholder="city"
                            required
                            error={errors2.city}
                            onChange={(e) => handleInputChange2(e)}
                            value={form2.city}
                            tipstyle={"hidden"}
                          />
                        </div>
                        <div className="ml-1 w-1/2 mt-1">
                          <Dropdown
                            label="Localtiy"
                            options={[
                              { value: "SEL", label: "Select", selected: true },
                              ...localTypes,
                            ]}
                            name={"locality"}
                            state={form2}
                            setState={setForm2}
                            required
                            error={errors2.locality}
                          />
                        </div>
                      </div>

                      <RadioButtons
                        label="  Preferred mode of presentation"
                        options={mode_arr}
                        state={form2}
                        setState={setForm2}
                        name="mode"
                        required
                        error={errors2.mode}
                        tip={"Participants from Pune should select offline mode only."}
                      />

                      {form2.mode === "0" && (
                        <div>
                          <InputBox
                            type="textarea"
                            label={"Reason for Online"}
                            name={"reason_of_mode"}
                            placeholder={"reason"}
                            required
                            error={errors2.reason_of_mode}
                            onChange={(e) => handleInputChange2(e)}
                            value={form2.reason_of_mode}
                          ></InputBox>
                        </div>
                      )}
                      <InputBox
                        type="text"
                        label="Referral"
                        name="referral"
                        placeholder="Referral ID given by Campus Ambassador"
                        onChange={(e) => handleInputChange2(e)}
                        value={form2.referral}
                        error={errors2.referral}
                        tip={"Referral should be between 3-50 characters long (if any)"}
                      />
                    </>
                  )}


                </>
              )}
              {formStep === 3 &&
                (paymentStatus ? (
                  <div className="shadow-md shadow-light_blue/20 bg-light_blue/30 rounded-xl  items-center p-4 md:p-8 border border-light_blue w-full">
                    <p className="text-xl text-center text-gold font-bold mb-3">
                      Thank you for registering in InC'24!
                    </p>
                    <NoteBox
                      title="Note"
                      text="Your registration payment will be verified and a confirmation will be sent to you by email within 7 days."
                    />
                  </div>
                ) : (
                  <div className="mb-6 shadow-md shadow-light_blue/20 bg-light_blue/30 rounded-xl  items-center p-4 md:p-8 border border-light_blue w-full">
                    <div className="justify-center items-center flex my-6">
                      <div className="z-10 bg-light_blue p-6 rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                          <h1 className="text-xl font-bold text-white">Scan the QR to pay</h1>
                        </div>
                        <img src={payment_qr} className="w-96 border-8 rounded-lg shadow-lg" alt="Payment QR Code" />
                      </div>
                    </div>
                    <InputBox
                      label="Transaction ID / UTR ID (12 digit)"
                      type="text"
                      name="payment_id"
                      placeholder="Enter Transaction ID"
                      inputref={paymentRef}
                      minlenght="8"
                      error={errors3.payment_id}
                      className="tracking-widest"
                      required
                    />
                  </div>
                ))}
              <div className="flex justify-between">
                {/* {formStep > 0 && formStep < 4 && (
                <Buttons
                  className="mx-2 my-2"
                  value=" Previous Step"
                  onClick={prevForm}
                  loading={
                    registerUserMutationForm1.isLoading ||
                    registerUserMutationForm2.isLoading
                  }
                />
              )} */}
                {formStep === 3 ? (
                  paymentStatus ? (
                    <></>
                  ) : (
                    <Buttons
                      className=" mx-2 my-2 "
                      value="Submit"
                      onClick={nextForm}
                      loading={registerUserMutationForm3.isLoading}
                    />
                  )
                ) : (
                  formStep === 2 &&
                  (paymentStatus ? (
                    <Buttons
                      className=" mx-2 my-2  "
                      value="Submit"
                      onClick={nextForm}
                      loading={
                        registerUserMutationForm0.isLoading ||
                        registerUserMutationForm1.isLoading ||
                        registerUserMutationForm2.isLoading
                      }
                    />
                  ) : (
                    <Buttons
                      className=" mx-2 my-2  "
                      value="Next Step"
                      onClick={nextForm}
                      loading={
                        registerUserMutationForm0.isLoading ||
                        registerUserMutationForm1.isLoading ||
                        registerUserMutationForm2.isLoading
                      }
                    />
                  ))
                )}
                {formStep < 2 && (
                  <Buttons
                    className=" mx-2 my-2  "
                    value="Next Step"
                    onClick={nextForm}
                    loading={
                      registerUserMutationForm0.isLoading ||
                      registerUserMutationForm1.isLoading ||
                      registerUserMutationForm2.isLoading
                    }
                  />
                )}
              </div>
            </form>
            {/* <Buttons
                  value="submit"
                  onClick={submit}
                  classNames='mx-2 my-2'
              /> */}
          </div>
        </>
        :
        <div className="md:mx-16 my-20">
          <CloseMessage />
        </div>
      }
    </MainContainer>
  );
}

export default TeamConcepts;
