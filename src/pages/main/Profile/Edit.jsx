import clsx from 'clsx';
import Select from 'react-select';
import avatarImage from '../../../assets/empty-profile.jpg';
import {
	createOptionOfYears,
	createOptionsOfDates,
	createOptionsOfMonths,
	getRoleFromLocalStorage,
	getTokenFromLocalStorage,
} from '../../../utils';
import { EditFormSkeleton } from '../../../components/base/Skeleton';
import { useProfile } from '../../../hooks';
import { useEffect, useState } from 'react';
import { uploadPhotoSeller, uploadSingleImage } from '../../../services/upload';
import {
	updateProfileCustomer,
	updateProfileSeller,
} from '../../../services/profile';
import { useNavigate } from 'react-router-dom';

export default function EditProfile() {
	const role = getRoleFromLocalStorage();
	const token = getTokenFromLocalStorage();
	const { data: profile, status } = useProfile(role);
	const [selectedFile, setSelectedFile] = useState(null);
	const navigate = useNavigate();

	const onSelecFile = e => {
		if (!e.target.files || e.target.files.length === 0) {
			setSelectedFile(null);
			return;
		}

		setSelectedFile(e.target.files[0]);
	};

	const handleUpdateProfile = async e => {
		try {
			e.preventDefault();
			const formData = new FormData(e.target);
			if (role === 'customer') {
				const name = formData.get('name');
				const email = formData.get('email');
				const phone = formData.get('phone');
				const gender = formData.get('gender');
				const date = formData.get('date');
				const month = formData.get('month');
				const year = formData.get('year');
				let image = '';
				if (selectedFile) {
					const fileFormData = new FormData();
					const file = formData.get('image');
					fileFormData.append('file', file);
					const response = await uploadSingleImage(fileFormData);
					image = response.secure_url;
				} else {
					image = profile.image;
				}
				const dateOfBirth = `${year}-${month}-${date}`;
				const customer = {
					name,
					email,
					phone,
					gender,
					image,
					date_of_birth: dateOfBirth,
				};
				await updateProfileCustomer(token, customer);
			} else if (role === 'seller') {
				const name = formData.get('name');
				const email = formData.get('email');
				const phone = formData.get('phone');
				const description = formData.get('description');
				if (selectedFile) {
					const imageFormData = new FormData();
					const image = formData.get('image');
					imageFormData.append('image', image);
					await uploadPhotoSeller(token, imageFormData);
				}
				const seller = {
					name,
					email,
					phone,
					description,
				};
				await updateProfileSeller(token, seller);
			}
			navigate(0);
		} catch (error) {
			console.log('Ups, error has occured while updating profile >> ', error);
		}
	};

	return (
		<section className='bg-white border border-[#9B9B9B] rounded p-4 lg:p-7 max-w-[850px]'>
			<div className='border-b border-b-[#D4D4D4] space-y-[6px] pb-4'>
				<h2 className='text-[#222222] text-xl font-semibold'>My Profile</h2>
				<p className='text-[#9B9B9B] text-sm font-medium'>
					Manage your profile information
				</p>
			</div>
			<div>
				{status === 'loading' ? (
					<EditFormSkeleton />
				) : (
					<form className='space-y-12 py-8' onSubmit={handleUpdateProfile}>
						<div className='flex flex-col lg:flex-row gap-8 lg:gap-16 lg:items-start'>
							<div className='lg:flex-1 space-y-5'>
								{profile.role === 'customer' ? (
									<CustomerForm profile={profile} />
								) : (
									<SellerForm profile={profile} />
								)}
							</div>
							<div className='lg:pl-16 lg:border-l border-l-[#D4D4D4]'>
								<UploadPhoto
									image={profile.image}
									name={profile.name}
									onSelecFile={onSelecFile}
									selectedFile={selectedFile}
								/>
							</div>
						</div>

						<div className='lg:ml-40'>
							<button
								type='submit'
								className='text-white text-sm font-medium py-2 px-8 bg-[#DB3022] leading-normal rounded-full'
							>
								Save
							</button>
						</div>
					</form>
				)}
			</div>
		</section>
	);
}

function FormControl({ children, itemsStart = false }) {
	return (
		<div
			className={clsx(
				'flex flex-col lg:flex-row gap-3 lg:gap-10 text-sm font-medium',
				itemsStart ? 'lg:items-start' : 'lg:items-center'
			)}
		>
			{children}
		</div>
	);
}

function Label({ children, id, maxWidth = true }) {
	return (
		<label
			htmlFor={id}
			className={clsx(
				'cursor-pointer text-[#9B9B9B] w-full lg:text-right',
				maxWidth && 'max-w-28'
			)}
		>
			{children}
		</label>
	);
}

function NonLabel({ children }) {
	return (
		<p className='text-[#9B9B9B] w-full max-w-28 lg:text-right'>{children}</p>
	);
}

function Input({ ...props }) {
	return (
		<input
			className='block text-[#222222] px-[18px] py-3 border border-[#9B9B9B] rounded w-full lg:max-w-[348px]'
			{...props}
		/>
	);
}

function TextArea({ ...props }) {
	return (
		<textarea
			cols='30'
			rows='10'
			className='block text-[#222222] px-[18px] py-3 border border-[#9B9B9B] rounded w-full max-w-[348px]'
			{...props}
		/>
	);
}

function RadioGroup({ id, label, name, defaultChecked, value }) {
	return (
		<div className='flex items-center gap-[10px]'>
			<Radio
				id={id}
				name={name}
				defaultChecked={defaultChecked}
				value={value}
			/>
			<Label id={id} maxWidth={false}>
				{label}
			</Label>
		</div>
	);
}

function Radio({ ...props }) {
	return <input type='radio' {...props} />;
}

function CustomSelect({ options, defaultValue, name }) {
	return (
		<Select
			options={options}
			defaultValue={defaultValue}
			styles={{
				indicatorSeparator: (baseStyles, state) => ({
					display: 'none',
				}),
				container: (baseStyles, state) => ({
					...baseStyles,
					width: '100px',
				}),
			}}
			name={name}
		/>
	);
}

function UploadPhoto({ image, name, selectedFile, onSelecFile }) {
	const [preview, setPreview] = useState(image);

	useEffect(() => {
		const objectUrl = selectedFile ? URL.createObjectURL(selectedFile) : image;
		setPreview(objectUrl);

		return () => URL.revokeObjectURL(objectUrl);
	}, [selectedFile]);

	return (
		<div className='flex flex-col items-start lg:items-center gap-5'>
			<div className='w-[110px] aspect-square rounded-full overflow-hidden border border-slate-300'>
				<img
					src={preview}
					alt={name}
					width={110}
					height={110}
					className='w-full h-full'
				/>
			</div>
			<div>
				<input
					className='peer w-[0.1px] h-[0.1px] opacity-0 overflow-hidden absolute -z-10'
					type='file'
					name='image'
					id='image'
					accept='image/*'
					// required={selectedFile ? true : false}
					onChange={onSelecFile}
				/>
				<label
					htmlFor='image'
					className='text-[#9B9B9B] text-sm font-medium py-2 px-6 border border-[#9B9B9B] rounded-full cursor-pointer'
				>
					Select image
				</label>
			</div>
		</div>
	);
}

const DATES = createOptionsOfDates();
const MONTHS = createOptionsOfMonths();
const YEARS = createOptionOfYears();

function getDefaultValueSelect(birth, range) {
	return range.find(({ label, value }) => {
		return value === birth;
	});
}

function CustomerForm({ profile }) {
	const dateOfBirth = profile.date_of_birth?.split('-');
	const birthYear = dateOfBirth[0];
	const birthMonth = dateOfBirth[1];
	const birthDate = dateOfBirth[2];
	const birthYearDefault = birthYear
		? getDefaultValueSelect(birthYear, YEARS)
		: YEARS[0];
	const birthMonthDefault = birthMonth
		? getDefaultValueSelect(birthMonth, MONTHS)
		: MONTHS[0];
	const birthDateDefault = birthDate
		? getDefaultValueSelect(birthDate, DATES)
		: DATES[0];

	return (
		<>
			<FormControl>
				<Label id='name'>Name</Label>
				<Input
					type='text'
					id='name'
					name='name'
					placeholder='Name'
					defaultValue={profile.name}
				/>
			</FormControl>
			<FormControl>
				<Label id='email'>Email</Label>
				<Input
					type='email'
					id='email'
					name='email'
					placeholder='Email'
					defaultValue={profile.email}
				/>
			</FormControl>
			<FormControl>
				<Label id='phone'>Phone Number</Label>
				<Input
					type='tel'
					id='phone'
					name='phone'
					placeholder='Phone Number'
					defaultValue={profile.phone}
				/>
			</FormControl>
			<FormControl>
				<NonLabel>Gender</NonLabel>
				<div className='flex items-center gap-9'>
					<RadioGroup
						id='male'
						label='Laki-laki'
						name='gender'
						defaultChecked={profile.gender === 'male'}
						value='male'
					/>
					<RadioGroup
						id='female'
						label='Perempuan'
						name='gender'
						defaultChecked={profile.gender === 'female'}
						value='female'
					/>
				</div>
			</FormControl>
			<FormControl>
				<NonLabel>Date of Birth</NonLabel>
				<div className='flex items-center flex-wrap gap-4'>
					<CustomSelect
						defaultValue={birthDateDefault}
						options={DATES}
						name='date'
					/>
					<CustomSelect
						defaultValue={birthMonthDefault}
						options={MONTHS}
						name='month'
					/>
					<CustomSelect
						defaultValue={birthYearDefault}
						options={YEARS}
						name='year'
					/>
				</div>
			</FormControl>
		</>
	);
}

function SellerForm({ profile }) {
	const { name, email, phone, desc } = profile;
	return (
		<>
			<FormControl>
				<Label id='name'>Name</Label>
				<Input
					type='text'
					id='name'
					name='name'
					placeholder='Name'
					defaultValue={name}
				/>
			</FormControl>
			<FormControl>
				<Label id='email'>Email</Label>
				<Input
					type='email'
					id='email'
					name='email'
					placeholder='Email'
					defaultValue={email}
				/>
			</FormControl>
			<FormControl>
				<Label id='phone'>Phone Number</Label>
				<Input
					type='tel'
					id='phone'
					name='phone'
					placeholder='Phone Number'
					defaultValue={phone}
				/>
			</FormControl>
			<FormControl itemsStart>
				<Label id='description'>Description</Label>
				<TextArea
					type='tel'
					id='description'
					name='description'
					defaultValue={desc}
				/>
			</FormControl>
		</>
	);
}
