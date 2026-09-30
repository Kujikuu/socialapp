import { zodResolver } from '@hookform/resolvers/zod'
import { AtIcon, EnvelopeIcon, LockIcon, UserIcon, UsersIcon } from '@phosphor-icons/react'
import { Button, Datepicker, Label, Select, TextInput } from 'flowbite-react'
import { useForm } from 'react-hook-form'
import * as Zod from 'zod'
import { api } from '../../hooks/AuthContext'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

export default function RegisterPage() {
    const MySwal = withReactContent(Swal)

    const registerSchema = Zod.object({
        name: Zod.string().min(4, "Name must be at least 4 characters").trim(),
        username: Zod.string().min(3, "Username must be at least 3 characters").max(20, "Username must not exceed 20 characters").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores").trim().toLowerCase(),
        email: Zod.string().min(1, "Email is required").email("Invalid email address").trim().toLowerCase(),
        dateOfBirth: Zod.string().min(1, "Date of birth is required").refine((dateStr) => {
            const birthDate = new Date(dateStr);
            const cutoff = new Date();
            cutoff.setFullYear(cutoff.getFullYear() - 13);
            return birthDate <= cutoff;
        }, "You must be at least 13 years old"),
        gender: Zod.enum(["male", "female"]),
        password: Zod.string().min(8, "Password must be at least 8 characters").regex(/[A-Z]/, "Password must contain at least one uppercase letter").regex(/[0-9]/, "Password must contain at least one number"),
        rePassword: Zod.string().min(1, "Please confirm your password")
    }).refine((data) => data.password === data.rePassword, {
        message: "Password dosn't match",
        path: ["rePassword"]
    });

    type registerInput = Zod.infer<typeof registerSchema>;

    const { handleSubmit, register, setValue, formState: { errors } } = useForm<registerInput>({
        defaultValues: {
            name: "",
            username: "",
            email: "",
            dateOfBirth: "",
            gender: "male",
            password: "",
            rePassword: ""
        },
        resolver: zodResolver(registerSchema), mode: 'onTouched'
    });

    async function handleRegister(data: registerInput) {
        api.post("/users/signup", {
            name: data.name,
            username: data.username,
            email: data.email,
            dateOfBirth: data.dateOfBirth,
            gender: data.gender,
            password: data.password,
            rePassword: data.rePassword
        }).then(() => {
            Swal.fire({
                title: "Account Created",
                text: "Your account has been created successfully.",
                icon: "success",
                draggable: false
            });
        }).catch((error) => {
            Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'Try Again',
                confirmButtonColor: '#dc2626',
            });
        })
    }

    return (
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit(handleRegister)}>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="name">Full name</Label>
                </div>
                <TextInput id="name" type="text" placeholder="Full name" icon={UserIcon} {...register("name")} />
                {errors.name && <p className='mt-2 text-red-500 text-sm'>{errors.name.message}</p>}
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="username">Username</Label>
                </div>
                <TextInput id="username" type="text" placeholder="Username (optional)" icon={AtIcon} {...register("username")} />
                {errors.username && <p className='mt-2 text-red-500 text-sm'>{errors.username.message}</p>}
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="email">Your email</Label>
                </div>
                <TextInput id="email" type="email" placeholder="Enter your email" icon={EnvelopeIcon} {...register("email")} />
                {errors.email && <p className='mt-2 text-red-500 text-sm'>{errors.email.message}</p>}
            </div>
            <div className="max-w-md">
                <div className="mb-2 block">
                    <Label htmlFor="gender">Select Gender</Label>
                </div>
                <Select id="gender" {...register("gender")} icon={UsersIcon}>
                    <option value={'male'}>Male</option>
                    <option value={'female'}>Female</option>
                </Select>
            </div>
            <div className="max-w-md">
                <div className="mb-2 block">
                    <Label htmlFor="dob">Date of Birth</Label>
                </div>
                <Datepicker id='dob' onChange={(date: Date | null) => {
                    if (date) {
                        const formattedDate = date.toISOString().split("T")[0];

                        setValue("dateOfBirth", formattedDate, {
                            shouldValidate: true,
                            shouldDirty: true
                        });
                    }
                }} />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="password2">Your password</Label>
                </div>
                <TextInput id="password" type="password" placeholder='Enter your password' icon={LockIcon} {...register("password")} />
                {errors.password && <p className='mt-2 text-red-500 text-sm'>{errors.password.message}</p>}
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="repeat-password">Repeat password</Label>
                </div>
                <TextInput id="repeat-password" type="password" placeholder='Repeat your password' icon={LockIcon} {...register("rePassword")} />
                {errors.rePassword && <p className='mt-2 text-red-500 text-sm'>{errors.rePassword.message}</p>}
            </div>
            <Button type="submit">Register new account</Button>
        </form>
    )
}
