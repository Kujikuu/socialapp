import { zodResolver } from '@hookform/resolvers/zod';
import { EnvelopeIcon, LockIcon } from '@phosphor-icons/react';
import { Button, Label, TextInput } from 'flowbite-react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router';
import * as Zod from "zod"
import { api, useAuth } from '../../hooks/AuthContext';

export default function LoginPage() {
    const { login } = useAuth();

    const loginSchema = Zod.object({
        email: Zod.string().nonempty("Email is required.").email("Invalid email address").trim().toLowerCase(),
        password: Zod.string().nonempty("Password is required.").min(1, "Password is required.")
    })

    let navigate = useNavigate();

    type loginInput = Zod.infer<typeof loginSchema>;

    const { handleSubmit, register, formState: { errors } } = useForm<loginInput>({
        defaultValues: {
            email: "",
            password: ""
        }, resolver: zodResolver(loginSchema), mode: 'onTouched'
    });

    async function handleSignIn(data: loginInput) {
        const res = await api.post("/users/signin", data);
        const token = res.data.data.token;

        login(token);

        navigate("/main")
    }

    return (
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit(handleSignIn)}>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="email">Your email</Label>
                </div>
                <TextInput id="email" type="email" placeholder="Enter your email" {...register("email")} icon={EnvelopeIcon} />
                {errors.email && <p className='mt-2 text-red-500 text-sm'>{errors.email.message}</p>}
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="password">Your password</Label>
                </div>
                <TextInput id="password" type="password" placeholder='Enter your password' {...register("password")} icon={LockIcon} />
                {errors.password && <p className='mt-2 text-red-500 text-sm'>{errors.password.message}</p>}
            </div>
            <Button type="submit">Log In</Button>
        </form>
    )
}
