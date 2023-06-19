import { Form, FormLayout, TextField, Button, Text, LegacyCard, Spinner, Divider, Loading, Frame } from '@shopify/polaris';
import axios from 'axios';
import React, { useState, memo } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

export default memo(function ContactUs() {
    const [content, setContent] = useState(<Text variant="headingSm" as="h6" >Don't hesitate to contact us if you face any problem or have any question about the app. We are happy to help you ^^</Text>);
    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            email: '',
            subject: '',
            message: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required("Email không được để trống")
                .matches(
                    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    "Email chưa hợp lệ"
                ),
            subject: Yup.string().required("Subject không được để trống"),
            message: Yup.string().required("Message không được để trống"),
        }),
        onSubmit: async (values, { resetForm }) => {
            setLoading(true);
            // try {
            //     const response = await axios.post("https://testapi.io/api/anhez/contact-us", values);
            //     setContent(
            //         <Text variant="headingSm" as="h6" color="success">{response.data.msg}</Text>
            //         );
            //     console.log(values);
            //     window.alert("Cảm ơn bạn đã liên hệ!");
            //     resetForm();
            // } catch (error) {
            //     window.alert(error);
            //     console.log(error);
            // }
            setTimeout(() => {
                setContent(<Text variant="headingSm" as="h6" color="success">Done!</Text>);
                setLoading(false);
            }, 5000)
        }
    });
    const handleChange = (value, id) => formik.handleChange({ target: { id, value } });

    return (
        <div style={{ width: "80%", margin: "0 auto" }}>
            <Frame>
                {loading ? <Loading /> : null}
                <Text variant="headingLg" as="h5">Contact</Text>
                <br />
                <Form onSubmit={formik.handleSubmit}>
                    <FormLayout>
                        <LegacyCard title={content}>
                            <LegacyCard.Section>
                                <TextField
                                    {...formik.getFieldProps("email")}
                                    id="email"
                                    label="Your email"
                                    type="email"
                                    autoComplete="email"
                                    error={formik.touched.email && formik.errors.email}
                                    onChange={handleChange}
                                />
                                <TextField
                                    {...formik.getFieldProps("subject")}
                                    id="subject"
                                    label="Subject"
                                    type="text"
                                    autoComplete="off"
                                    error={formik.touched.subject && formik.errors.subject}
                                    onChange={handleChange}
                                />
                                <TextField
                                    {...formik.getFieldProps("message")}
                                    id="message"
                                    label="Message"
                                    multiline={4}
                                    autoComplete="off"
                                    error={formik.touched.message && formik.errors.message}
                                    onChange={handleChange}
                                />
                            </LegacyCard.Section>
                            <LegacyCard.Section>
                                <Button primary submit disabled={loading}>
                                    {loading ? (
                                        <Spinner accessibilityLabel="loading" size="small" />
                                    ) : (
                                        "Send"
                                    )}
                                </Button>
                            </LegacyCard.Section>
                        </LegacyCard>
                    </FormLayout>
                </Form>
            </Frame>
        </div>
    );
}
)