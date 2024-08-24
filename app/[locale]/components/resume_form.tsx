"use client";

import FileUploader from "../components/file_uploader";
import IncreamentingInputWidget from "../components/increamenting_input";
import OptionsComponent from "../components/option";
import {
  InputTextAreaComponent,
  InputTextComponent,
} from "../components/text_input";
 import { SubmitButtonComponent } from "../components/button";
import {useRef,useCallback ,useEffect, useState} from "react";
 import ErrorComponent from "../components/error";
import { useTranslations } from "next-intl";
import { useParams,useSearchParams, } from "next/navigation";
 import useHandleForm from "../hooks/handle_forms";
import useGetData from "@/app/utils/getData";
import {instance} from "@/app/utils/axios";

export default function ResumeForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const isEnglish = useParams().locale == "en";
  let position:any = null;
 const content = useTranslations("")
 const [jobsList,setJobsList] = useState<any[]>([])
    const { isSubmitting, handleSubmit, submitError,canNavigate } = useHandleForm({
    successNavUrl: "/careers",
    url: "/resumes/upload-resume",
    id: "",
  });
    let id = useSearchParams().get("availableJob")
    let title = useSearchParams().get("jobName")
    
    let data = null;

    const fetchData = useCallback(async () => {
      try {
        let response:any;
        if(id=="false" ){
          response = await instance.get('/api/' + "availableJobs");
           setJobsList(response.data.availableJobs?.availableJobs || []);  
  
        } 
      } catch (error) {
        console.error('Error fetching clientData:', error);
      }
    }, [id]); 
    useEffect(()=>{
        if(id =='false'){
          fetchData()
        }

    },[id])
    return (
    <>

      <div className="bg-sky-50 h-screen sm:p-10 p-4 flex flex-col items-center justify-center">
      <div className="p-12"/>

        {title ? (
          <>
            <h1 className="text-xl font-bold">{content("companyName")}</h1>
            <h2 className="my-6">
              {content("YouAppliedFor") +
                " " +
                title+
                " " +
                content("pleaseFillTheForm")}
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
            {content("YourPersonalData")}
          </span>
          <span className="text-sm text-gray-500">
            {content("AllDataAreRequired")}
          </span>
          <div className="  w-full">
            <div className="w-full h-[3rem]"></div>
          </div>

          {title && id? (
            <input
              onChange={(_) => {}}
              type="text"
              name="appliedJob"
              hidden
              value={id}
            />
          ) : (
            <>
              <OptionsComponent
              isEnglish={isEnglish}
              isObject={true}
                onChange={(_) => {}}
                name={"appliedJob"}
                optionsList={
                  jobsList ?? []
                }
                title={content("PositionThatWillSuitYou") ?? ""}
              />
            </>
          )}
          <InputTextComponent
            direction={isEnglish ? "ltr" : "rtl"}
            placeholder={content("FullName")}
            disabled={isSubmitting}
            type={""}
            required={true}
            name={"name"}
            value={""}
            id={null}
          />
          <InputTextComponent
            direction={isEnglish ? "ltr" : "rtl"}
            placeholder={content("Address")}
            disabled={isSubmitting}
            type={""}
            required={true}
            name={"address"}
            value={""}
            id={null}
          />
          <InputTextComponent
            direction={isEnglish ? "ltr" : "rtl"}
            placeholder={content("Nationality")}
            disabled={isSubmitting}
            type={""}
            required={true}
            name={"nationality"}
            value={""}
            id={null}
          />
          <InputTextComponent
            direction={isEnglish ? "ltr" : "rtl"}
            placeholder={content("Religion")}
            disabled={isSubmitting}
            type={""}
            required={true}
            name={"religion"}
            value={""}
            id={null}
          />
          <InputTextComponent
            direction={isEnglish ? "ltr" : "rtl"}
            placeholder={content("PhoneNumber")}
            disabled={isSubmitting}
            type={"number"}
            required={true}
            name={"phoneNumber"}
            value={""}
            id={null}
          />
          <InputTextComponent
            direction={isEnglish ? "ltr" : "rtl"}
            placeholder={content("EmailAddress")}
            disabled={isSubmitting}
            type={"email"}
            required={true}
            name={"email"}
            value={""}
            id={null}
          />
          <div className="flex w-full items-end mb-14 flex-wrap lg:flex-nowrap">
            <InputTextComponent
              direction={isEnglish ? "ltr" : "rtl"}
              placeholder={content("Age")}
              type={"number"}
              disabled={isSubmitting}
              required={true}
              name={"age"}
              value={""}
              id={null}
            />
            <div className="w-20"></div>

            <InputTextComponent
              direction={isEnglish ? "ltr" : "rtl"}
              placeholder={content("DateOfBirth")}
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
                content("male") ?? "",
                content("female") ?? "",
              ]}
              title={content("gender") ?? ""}
            />
            <div className="w-20"></div>

            <OptionsComponent
              name={"militaryStatus"}
              optionsList={[
                content("finished") ?? "",
                content("exempted") ?? "",
                content("delayed") ?? "",
                content("inReserve") ?? "",
              ]}
              title={content("militaryStatus") ?? ""}
            />
          </div>
          <div className="w-full min-h-24 flex flex-col items-center justify-center">
            <p className="text-xl font-bold">
              {content("YourEducationAndTrainings")}
            </p>
            <p className="text-sm text-gray-500">
              {content("AllDataAreRequired")}
            </p>
          </div>

          <InputTextComponent
            direction={isEnglish ? "ltr" : "rtl"}
            disabled={isSubmitting}
            placeholder={content("University")}
            type={""}
            required={true}
            name={"university"}
            value={""}
            id={null}
          />
          <InputTextComponent
            direction={isEnglish ? "ltr" : "rtl"}
            disabled={isSubmitting}
            placeholder={content("Faculty")}
            type={""}
            required={true}
            name={"faculty"}
            value={""}
            id={null}
          />
          <InputTextComponent
            direction={isEnglish ? "ltr" : "rtl"}
            disabled={isSubmitting}
            placeholder={content("Grade")}
            type={""}
            required={true}
            name={"grade"}
            value={""}
            id={null}
          />
          <InputTextComponent
            direction={isEnglish ? "ltr" : "rtl"}
            disabled={isSubmitting}
            placeholder={content("GraduationYear")}
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
            {content("CoursesAndTrainingsSection")}
          </span>

          <IncreamentingInputWidget
            component={
              <div key={Math.round(Math.random() * 800)}>
                <InputTextComponent
                  direction={isEnglish ? "ltr" : "rtl"}
                  disabled={isSubmitting}
                  placeholder={content("CourseName")}
                  type={""}
                  required={true}
                  name={"courseNameList"}
                  value={""}
                  id={null}
                />
                <InputTextComponent
                  direction={isEnglish ? "ltr" : "rtl"}
                  disabled={isSubmitting}
                  placeholder={content("Institute")}
                  type={""}
                  required={true}
                  name={"instituteList"}
                  value={""}
                  id={null}
                />
                <InputTextComponent
                  direction={isEnglish ? "ltr" : "rtl"}
                  disabled={isSubmitting}
                  placeholder={content("From")}
                  type={"date"}
                  required={true}
                  name={"courseFromDateList"}
                  value={""}
                  id={null}
                />
                <InputTextComponent
                  direction={isEnglish ? "ltr" : "rtl"}
                  disabled={isSubmitting}
                  placeholder={content("To")}
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
            {content("YourExperiences")}
          </span>
          <span className="text-sm text-gray-500">
            {content("AllDataAreRequired")}
          </span>
          <IncreamentingInputWidget
            component={
              <div key={Math.round(Math.random() * 400)}>
                <InputTextComponent
                  direction={isEnglish ? "ltr" : "rtl"}
                  disabled={isSubmitting}
                  placeholder={content("CompanyName")}
                  type={""}
                  required={true}
                  name={"companyNameList"}
                  value={""}
                  id={null}
                />
                <InputTextComponent
                  direction={isEnglish ? "ltr" : "rtl"}
                  disabled={isSubmitting}
                  placeholder={content("CompanyAddress")}
                  type={""}
                  required={true}
                  name={"companyAddressList"}
                  value={""}
                  id={null}
                />
                <div className="flex">
                  <InputTextComponent
                    direction={isEnglish ? "ltr" : "rtl"}
                    disabled={isSubmitting}
                    placeholder={content("Position")}
                    type={""}
                    required={true}
                    name={"positionList"}
                    value={""}
                    id={null}
                  />
                  <InputTextComponent
                    direction={isEnglish ? "ltr" : "rtl"}
                    disabled={isSubmitting}
                    placeholder={content("From")}
                    type={"date"}
                    required={true}
                    name={"fromDateList"}
                    value={""}
                    id={null}
                  />
                  <InputTextComponent
                    direction={isEnglish ? "ltr" : "rtl"}
                    disabled={isSubmitting}
                    placeholder={content("To")}
                    type={"date"}
                    required={true}
                    name={"toDateList"}
                    value={""}
                    id={null}
                  />
                </div>
                <InputTextAreaComponent
                  direction={isEnglish ? "ltr" : "rtl"}
                  disabled={isSubmitting}
                  placeholder={content("WhatIsYourRoles")}
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
            {content("YourResumeAndCoverLetter")}
          </span>
          <span className="text-sm text-gray-500">
            {content("AllDataAreRequired")}
          </span>
          <div className="w-full">
            <InputTextAreaComponent
              direction={isEnglish ? "ltr" : "rtl"}
              disabled={isSubmitting}
              placeholder={content("CoverLetter")}
              type={""}
              required={false}
              name={"coverLetter"}
              value={""}
              id={null}
            />

            <FileUploader
              title={content("SelectResume")}
              subTitle={content("NoFileSelected")}
              disabled={isSubmitting}
            />
            <div className="w-[10rem] mt-10 m-auto">
              <SubmitButtonComponent
                title={content("Submit")}
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




