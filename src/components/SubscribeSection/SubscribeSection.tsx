import Typography from "../Typography/Typography.tsx";
import { useMedia } from "../../hooks/useMedia.tsx";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "../Input/Input.tsx";
import Button from "../Button/Button.tsx";
import Checkbox from "../Checkbox/Checkbox.tsx";
import Link from "../Links/Link.tsx";
import { useState } from "react";
import { createSubscription } from "../../api/SubscribeAPI.ts";
import ModalWindow from "../Modal/ModalWindow.tsx";
import Container from "../Container/Container.tsx";

const SubscribeSection = () => {
	const { isDesktop, isMobile } = useMedia();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const validationSchema = Yup.object({
		name: Yup.string()
			.min(2, "Поля повинні мати більше 2 символів")
			.max(30, "Ім’я повинно бути не більше 30 знаків")
			.required("Заповніть пусте поле"),
		email: Yup.string()
			.email("Введіть дійсний email")
			.test("domain", "Корабель там 🖕", (value) => {
				return !value?.endsWith(".ru") && !value?.endsWith(".by");
			})
			.required("Введіть дійсний email"),
		check: Yup.bool()
			.oneOf([true], "Це поле є обов’язковим")
			.required("Це поле є обов’язковим"),
	});

	return (
		<section>
			<Container>
				<div className={"subscribe-wrapper md:min-h-[606px] lg:min-h-[626px] "}>
					<div className={"text-center md:ml-[38%] lg:ml-[23%]"}>
						<Typography
							variant={isDesktop ? "h2" : "h3"}
							component={isDesktop ? "h2" : "h3"}
						>
							Підписка на новини
						</Typography>
					</div>
					<Formik
						initialValues={{ name: "", email: "", check: false }}
						validationSchema={validationSchema}
						onSubmit={async (values, { setSubmitting, resetForm }) => {
							try {
								const response = await createSubscription({
									name: values.name,
									email: values.email,
								});
								if (response) {
									setIsModalOpen(true);
								}
							} catch (e) {
								console.log(e);
							} finally {
								setSubmitting(false);
							}
							resetForm();
						}}
						validateOnChange={true}
						validateOnBlur={true}
					>
						{({
								values,
								handleBlur,
								handleChange,
								errors,
								touched,
								isValid,
							}) => (
							<Form className={"flex flex-col md:items-start md:ml-[50%] "}>
								<div>
									<Input
										id={"name"}
										value={values.name}
										error={
											errors.name && touched.name ? errors.name : undefined
										}
										name={"name"}
										minLength={2}
										type={"text"}
										label={"Ім'я"}
										onChange={handleChange}
										onBlur={handleBlur}
										style={{ minWidth: isMobile ? "200px" : "350px" }}
									/>

									<Input
										id={"email"}
										value={values.email}
										error={
											errors.email && touched.email ? errors.email : undefined
										}
										name={"email"}
										type={"email"}
										label={"Email"}
										onChange={handleChange}
										onBlur={handleBlur}
										className={"md:w-full "}
										style={{ minWidth: isMobile ? "200px" : "350px" }}
									/>
								</div>

								<div className={"mt-[56px] md:w-[350px] lg:w-full"}>
									<Checkbox
										name={"check"}
										id={"subscribe"}
										checked={values.check}
										onCheck={handleChange}
									>
										<p
											className={
												"text-[14px] leading-[26px] md:w-[230px] lg:w-full lg:text-[18px]"
											}
										>
											Я погоджуюся з{" "}
											<Link
												variant={"underlineFooter"}
												to={"/public/files/site_rules.pdf"}
												style={{ color: "black" }}
											>
												правилами
											</Link>{" "}
											сайту hyst.site
										</p>
									</Checkbox>
									{errors.check && touched.check && (
										<p className={"text-error100 mt-3 pl-[10px] text-[14px]"}>
											{errors.check}
										</p>
									)}
									<Button
										className={"md:w-[167px] mt-[38px] lg:mt-[42px]"}
										variant={"primary"}
										disabled={!isValid}
										size={"large"}
										type={"submit"}
									>
										Надіслати
									</Button>
								</div>
							</Form>
						)}
					</Formik>
					<ModalWindow
						className={
							"p-4 bg-yellow50 h-[478px] w-full md:w-[480px] md:h-[518px] md:rounded"
						}
						active={isModalOpen}
						setActive={setIsModalOpen}
					>
						<div className={"text-black mt-[80px] md:mt-[108px]"}>
							<Typography
								variant={"h4"}
								component={"p"}
								className={"text-center font-medium"}
							>
								Ви успішно підписались на новини{" "}
							</Typography>
							<div className={"flex justify-center mt-10"}>
								<img className={'md:w-[114px] md:h-[114px]'} src="/images/success-sent.svg" alt="success" />
							</div>
							<div className={"flex justify-center w-full mt-12"}>

								<div className={'w-full md:w-[185px]'}>
									<Button
										variant={"primary"}
										size={"large"}
										className={'text-[18px] font-light leading-[28px] h-[48px]'}
										onClick={(e) => {
											e.preventDefault();
											setIsModalOpen(false);
										}}>
										До головної
									</Button>
								</div>
							</div>
						</div>
					</ModalWindow>
				</div>
			</Container>
		</section>
	);
};

export default SubscribeSection;
