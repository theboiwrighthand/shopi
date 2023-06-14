import { Form, FormLayout, TextField, Button, Text, LegacyStack } from '@shopify/polaris';
import axios from 'axios';
import React, { useState, useCallback, memo } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';


export default memo(function ContactUs() {
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [content, setContent] = useState("Don't hesitate to contact us if you face any problem or have any question about the app. We are happy to help you ^^");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            email: '',
            subject: '',
            message: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Email không hợp lệ").required("Email không được để trống"),
            subject: Yup.string().required("Subject không được để trống"),
            message: Yup.string().required("Message không được để trống"),
        }),

    })


    const handleSubmit = async (event) => {
        event.preventDefault();
        const request = {
            email,
            subject,
            message,
        };

        const schema = Yup.object().shape({
            email: Yup.string().email("Email không hợp lệ").required("Email không được để trống"),
            subject: Yup.string().required("Subject không được để trống"),
            message: Yup.string().required("Message không được để trống"),
        });

        setLoading(!false);

        try {
            await schema.validate(request, { abortEarly: false });
            const response = await axios.post("https://testapi.io/api/anhez/contact-us", request);

            setEmail("");
            setSubject("");
            setMessage("");
            setContent(response.data.msg);
            setErrors({});
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const validationErrors = {};
                error.inner.forEach((err) => {
                    validationErrors[err.path] = err.message;
                });
                setErrors(validationErrors);
            }
        }
        setLoading(false);
    };

    const handleEmailChange = useCallback((value) => setEmail(value), []);
    const handleSubjectChange = useCallback((value) => setSubject(value), []);
    const handleMessageChange = useCallback((value) => setMessage(value), []);

    return (
        <div style={{ width: "80%", margin: "0 auto" }}>
            <LegacyStack vertical>
                <Text variant="heading2xl" as="h3">
                    Contact
                </Text>
            </LegacyStack>
            <br />
            <Text variant="headingSm" as="h6" color='success'>
                {content}
            </Text>
            <br />
            <Form onSubmit={formik.handleSubmit}>
                <FormLayout>
                    <TextField
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        label="Email"
                        type="email"
                        autoComplete="email"
                        error={formik.errors.email && formik.touched.email}
                    />
                    <TextField
                        value={formik.values.subject}
                        onChange={formik.handleChange}
                        label="Subject"
                        type="text"
                        autoComplete="off"
                        error={formik.errors.subject && formik.errors.subject}
                    />
                    <TextField
                        label="Message"
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        multiline={4}
                        autoComplete="off"
                        error={formik.errors.message && formik.touched.message}
                    />

                    {loading ? (
                        <Button loading primary submit>
                            Submit
                        </Button>
                    ) : (
                        <Button primary submit>
                            Submit
                        </Button>
                    )}

                </FormLayout>
            </Form>
        </div>
    );
}
) 