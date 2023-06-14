import { Form, FormLayout, TextField, Button, Text, LegacyStack } from '@shopify/polaris';
import axios from 'axios';
import React, { useState, memo } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import './contact.css'


export default memo(function ContactUs() {
    const [content, setContent] = useState("Don't hesitate to contact us if you face any problem or have any question about the app. We are happy to help you ^^");
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
        onSubmit: async (value, { resetForm }) => {
            setLoading(!false);
            try {
                const response = await axios.post("https://testapi.io/api/anhez/contact-us", value);
                setContent(response.data.msg);
                // console.log(response.data.msg);
                window.alert("Cảm ơn bạn đã liên hệ!");
                resetForm();
            } catch (error) {
                window.alert(error)
                console.log(error);
            }
            setLoading(false);
        }

    })

    return (
        <div className='form-contact' style={{ width: "80%", margin: "0 auto" }}>
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
            <form className='form-group ' onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="email">Your Email:</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                    <Text variant="headingXs" as="h6" color="critical">
                        {`*${formik.errors.email}`}
                    </Text>
                ) : null}
                <br />

                <label htmlFor="subject">Subject:</label>
                <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.subject && formik.errors.subject ? (
                    <Text variant="headingXs" as="h6" color="critical">
                        {`*${formik.errors.subject}`}
                    </Text>
                ) : null}
                <br />

                <label htmlFor="message">Message:</label>
                <textarea
                    id="message"
                    name="message"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    rows="6"
                />
                {formik.touched.message && formik.errors.message ? (
                    <Text variant="headingXs" as="h6" color="critical">
                        {`*${formik.errors.message}`}
                    </Text>
                ) : null}
                <br />

                {loading ? (
                    <Button loading primary submit>
                        Submit
                    </Button>
                ) : (
                    <Button primary submit>
                        Submit
                    </Button>
                )}
            </form>
        </div>
    );
}
)