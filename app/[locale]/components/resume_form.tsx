import { useLocation } from "react-router";
import FileUploader from "../components/file_uploader";
import IncreamentingInputWidget from "../components/increamenting_input";
import OptionsComponent from "../components/option";
import {
  InputTextAreaComponent,
  InputTextComponent,
} from "../components/text_input";
import useHandleForm from "../hooks/handle_forms";
import { SubmitButtonComponent } from "../components/button";
import { useEffect, useRef, useState } from "react";
import { useCurrentLanguage } from "../hooks/get_language";
import ErrorComponent from "../components/error";

export default function ResumeForm() {
  const location = useLocation();
  const formRef = useRef<HTMLFormElement>(null);
  let language = useCurrentLanguage();
  const [content, setContent] = useState<ContentInterface>({
    isEnglish: false,
    data: null,
  });
  useEffect(() => {
    if (language) {
      setContent({
        isEnglish: language.type === "en",
        data: language.value,
      });
    }
  }, [language]);

  const { isSubmitting, handleSubmit, submitError } = useHandleForm({
    successNavUrl: "/careers",
    url: "/resumes/upload-resume",
    id: "",
  });
  return (
    <>
      <div className="bg-sky-50 h-screen sm:p-10 p-4 flex flex-col items-center justify-center">
        {location.state?.position ? (
          <>
            <h1 className="text-xl font-bold">{content.data?.companyName}</h1>
            <h2 className="my-6">
              {content.data?.YouAppliedFor +
                " " +
                location.state.position +
                " " +
                content.data?.pleaseFillTheForm}
            </h2>
          </>
        ) : (
          <></>
        )}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          action=""
          className="flex max-w-[1080px] overflow-y-auto overflow-x-hidden flex-col items-center sm:p-12 p-4 bg-white sm:w-5/6 w-full h-full rounded"
        >
          <span className="text-xl font-bold">
            {content.data?.YourPersonalData}
          </span>
          <span className="text-sm text-gray-500">
            {content.data?.AllDataAreRequired}
          </span>
          <div className="  w-full">
            <div className="w-full h-[3rem]"></div>
          </div>

          {location.state?.id ? (
            <input
              onChange={(_) => {}}
              type="text"
              name="appliedJob"
              hidden
              value={location.state.id}
            />
          ) : (
            <>
              <OptionsComponent
              isObject={true}
                onChange={(_) => {}}
                name={"appliedJob"}
                optionsList={
                  location.state?.availableJobs ?? []
                }
                title={content.data?.PositionThatWillSuitYou ?? ""}
              />
            </>
          )}
          <InputTextComponent
            direction={content.isEnglish ? "ltr" : "rtl"}
            placeholder={content.data?.FullName}
            disabled={isSubmitting}
            type={""}
            required={true}
            name={"name"}
            value={""}
            id={null}
          />
          <InputTextComponent
            direction={content.isEnglish ? "ltr" : "rtl"}
            placeholder={content.data?.Address}
            disabled={isSubmitting}
            type={""}
            required={true}
            name={"address"}
            value={""}
            id={null}
          />
          <InputTextComponent
            direction={content.isEnglish ? "ltr" : "rtl"}
            placeholder={content.data?.Nationality}
            disabled={isSubmitting}
            type={""}
            required={true}
            name={"nationality"}
            value={""}
            id={null}
          />
          <InputTextComponent
            direction={content.isEnglish ? "ltr" : "rtl"}
            placeholder={content.data?.Religion}
            disabled={isSubmitting}
            type={""}
            required={true}
            name={"religion"}
            value={""}
            id={null}
          />
          <InputTextComponent
            direction={content.isEnglish ? "ltr" : "rtl"}
            placeholder={content.data?.PhoneNumber}
            disabled={isSubmitting}
            type={"number"}
            required={true}
            name={"phoneNumber"}
            value={""}
            id={null}
          />
          <InputTextComponent
            direction={content.isEnglish ? "ltr" : "rtl"}
            placeholder={content.data?.EmailAddress}
            disabled={isSubmitting}
            type={"email"}
            required={true}
            name={"email"}
            value={""}
            id={null}
          />
          <div className="flex w-full items-end mb-14 flex-wrap lg:flex-nowrap">
            <InputTextComponent
              direction={content.isEnglish ? "ltr" : "rtl"}
              placeholder={content.data?.Age}
              type={"number"}
              disabled={isSubmitting}
              required={true}
              name={"age"}
              value={""}
              id={null}
            />
            <div className="w-20"></div>

            <InputTextComponent
              direction={content.isEnglish ? "ltr" : "rtl"}
              placeholder={content.data?.DateOfBirth}
              disabled={isSubmitting}
              type={"date"}
              required={true}
              name={"birthDate"}
              value={""}
              id={null}
            />
            <div className="w-20"></div>
            <OptionsComponent
              name="gender"
              optionsList={[
                content.data?.male ?? "",
                content.data?.female ?? "",
              ]}
              title={content.data?.gender ?? ""}
            />
            <div className="w-20"></div>

            <OptionsComponent
              name={"militaryStatus"}
              optionsList={[
                content.data?.finished ?? "",
                content.data?.exempted ?? "",
                content.data?.delayed ?? "",
                content.data?.inReserve ?? "",
              ]}
              title={content.data?.militaryStatus ?? ""}
            />
          </div>
          <div className="w-full min-h-24 flex flex-col items-center justify-center">
            <p className="text-xl font-bold">
              {content.data?.YourEducationAndTrainings}
            </p>
            <p className="text-sm text-gray-500">
              {content.data?.AllDataAreRequired}
            </p>
          </div>

          <InputTextComponent
            direction={content.isEnglish ? "ltr" : "rtl"}
            disabled={isSubmitting}
            placeholder={content.data?.University}
            type={""}
            required={true}
            name={"university"}
            value={""}
            id={null}
          />
          <InputTextComponent
            direction={content.isEnglish ? "ltr" : "rtl"}
            disabled={isSubmitting}
            placeholder={content.data?.Faculty}
            type={""}
            required={true}
            name={"faculty"}
            value={""}
            id={null}
          />
          <InputTextComponent
            direction={content.isEnglish ? "ltr" : "rtl"}
            disabled={isSubmitting}
            placeholder={content.data?.Grade}
            type={""}
            required={true}
            name={"grade"}
            value={""}
            id={null}
          />
          <InputTextComponent
            direction={content.isEnglish ? "ltr" : "rtl"}
            disabled={isSubmitting}
            placeholder={content.data?.GraduationYear}
            type={"number"}
            required={true}
            name={"graduationYear"}
            value={""}
            id={null}
          />
          <div className="">
            <div className="h-14"></div>
          </div>
          <span className="  text-xl font-bold ">
            {content.data?.CoursesAndTrainingsSection}
          </span>

          <IncreamentingInputWidget
            component={
              <div key={Math.round(Math.random() * 800)}>
                <InputTextComponent
                  direction={content.isEnglish ? "ltr" : "rtl"}
                  disabled={isSubmitting}
                  placeholder={content.data?.CourseName}
                  type={""}
                  required={true}
                  name={"courseNameList"}
                  value={""}
                  id={null}
                />
                <InputTextComponent
                  direction={content.isEnglish ? "ltr" : "rtl"}
                  disabled={isSubmitting}
                  placeholder={content.data?.Institute}
                  type={""}
                  required={true}
                  name={"instituteList"}
                  value={""}
                  id={null}
                />
                <InputTextComponent
                  direction={content.isEnglish ? "ltr" : "rtl"}
                  disabled={isSubmitting}
                  placeholder={content.data?.From}
                  type={"date"}
                  required={true}
                  name={"courseFromDateList"}
                  value={""}
                  id={null}
                />
                <InputTextComponent
                  direction={content.isEnglish ? "ltr" : "rtl"}
                  disabled={isSubmitting}
                  placeholder={content.data?.To}
                  type={"date"}
                  required={true}
                  name={"courseToDateList"}
                  value={""}
                  id={null}
                />
              </div>
            }
          />
          <div className="  p-16 w-full"></div>
          <span className="text-xl font-bold">
            {content.data?.YourExperiences}
          </span>
          <span className="text-sm text-gray-500">
            {content.data?.AllDataAreRequired}
          </span>
          <IncreamentingInputWidget
            component={
              <div key={Math.round(Math.random() * 400)}>
                <InputTextComponent
                  direction={content.isEnglish ? "ltr" : "rtl"}
                  disabled={isSubmitting}
                  placeholder={content.data?.CompanyName}
                  type={""}
                  required={true}
                  name={"companyNameList"}
                  value={""}
                  id={null}
                />
                <InputTextComponent
                  direction={content.isEnglish ? "ltr" : "rtl"}
                  disabled={isSubmitting}
                  placeholder={content.data?.CompanyAddress}
                  type={""}
                  required={true}
                  name={"companyAddressList"}
                  value={""}
                  id={null}
                />
                <div className="flex">
                  <InputTextComponent
                    direction={content.isEnglish ? "ltr" : "rtl"}
                    disabled={isSubmitting}
                    placeholder={content.data?.Position}
                    type={""}
                    required={true}
                    name={"positionList"}
                    value={""}
                    id={null}
                  />
                  <InputTextComponent
                    direction={content.isEnglish ? "ltr" : "rtl"}
                    disabled={isSubmitting}
                    placeholder={content.data?.From}
                    type={"date"}
                    required={true}
                    name={"fromDateList"}
                    value={""}
                    id={null}
                  />
                  <InputTextComponent
                    direction={content.isEnglish ? "ltr" : "rtl"}
                    disabled={isSubmitting}
                    placeholder={content.data?.To}
                    type={"date"}
                    required={true}
                    name={"toDateList"}
                    value={""}
                    id={null}
                  />
                </div>
                <InputTextAreaComponent
                  direction={content.isEnglish ? "ltr" : "rtl"}
                  disabled={isSubmitting}
                  placeholder={content.data?.WhatIsYourRoles}
                  type={""}
                  required={false}
                  name={"roleSummaryList"}
                  value={""}
                  id={null}
                />
              </div>
            }
          />
          <div className="  p-16 w-full"></div>
          <span className="text-xl font-bold">
            {content.data?.YourResumeAndCoverLetter}
          </span>
          <span className="text-sm text-gray-500">
            {content.data?.AllDataAreRequired}
          </span>
          <div className="w-full">
            <InputTextAreaComponent
              direction={content.isEnglish ? "ltr" : "rtl"}
              disabled={isSubmitting}
              placeholder={content.data?.CoverLetter}
              type={""}
              required={false}
              name={"coverLetter"}
              value={""}
              id={null}
            />

            <FileUploader
              title={content.data?.SelectResume}
              subTitle={content.data?.NoFileSelected}
              disabled={isSubmitting}
            />
            <div className="w-[10rem] mt-10 m-auto">
              <SubmitButtonComponent
                title={content.data?.Submit}
                loading={isSubmitting}
              />
            </div>
          </div>
        </form>
        <div className="w-full max-w-[1080px]">
        <ErrorComponent error={submitError ?? ""} />

        </div>
      </div>
    </>
  );
}
