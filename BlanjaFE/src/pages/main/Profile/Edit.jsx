import clsx from 'clsx';
import Select from 'react-select';
import avatarImage from '../../../assets/empty-profile.jpg';
import {
	createOptionOfYears,
	createOptionsOfDates,
	createOptionsOfMonths,
	getRoleFromLocalStorage,
} from '../../../utils';

const DATES = createOptionsOfDates();
const MONTHS = createOptionsOfMonths();
const YEARS = createOptionOfYears();

export default function EditProfile() {
	const role = getRoleFromLocalStorage();
	let formUser = null;

	if (role === 'customer') {
		formUser = (
			<>
				<FormControl>
					<Label id='name'>Name</Label>
					<Input type='text' id='name' name='name' placeholder='Name' />
				</FormControl>
				<FormControl>
					<Label id='email'>Email</Label>
					<Input type='email' id='email' name='email' placeholder='Email' />
				</FormControl>
				<FormControl>
					<Label id='phone'>Phone Number</Label>
					<Input
						type='tel'
						id='phone'
						name='phone'
						placeholder='Phone Number'
					/>
				</FormControl>
				<FormControl>
					<NonLabel>Gender</NonLabel>
					<div className='flex items-center gap-9'>
						<RadioGroup id='male' label='Laki-laki' name='gender' />
						<RadioGroup id='female' label='Perempuan' name='gender' />
					</div>
				</FormControl>
				<FormControl>
					<NonLabel>Date of Birth</NonLabel>
					<div className='flex items-center flex-wrap gap-4'>
						<CustomSelect defaultValue={DATES[0]} options={DATES} name='date' />
						<CustomSelect
							defaultValue={MONTHS[0]}
							options={MONTHS}
							name='month'
						/>
						<CustomSelect defaultValue={YEARS[0]} options={YEARS} name='year' />
					</div>
				</FormControl>
			</>
		);
	} else if (role === 'seller') {
		formUser = (
			<>
				<FormControl>
					<Label id='name'>Name</Label>
					<Input type='text' id='name' name='name' placeholder='Name' />
				</FormControl>
				<FormControl>
					<Label id='email'>Email</Label>
					<Input type='email' id='email' name='email' placeholder='Email' />
				</FormControl>
				<FormControl>
					<Label id='phone'>Phone Number</Label>
					<Input
						type='tel'
						id='phone'
						name='phone'
						placeholder='Phone Number'
					/>
				</FormControl>
				<FormControl itemsStart>
					<Label id='description'>Description</Label>
					<TextArea type='tel' id='description' name='description' />
				</FormControl>
			</>
		);
	}

	return (
		<section className='bg-white border border-[#9B9B9B] rounded p-4 lg:p-7 max-w-[850px]'>
			<div className='border-b border-b-[#D4D4D4] space-y-[6px] pb-4'>
				<h2 className='text-[#222222] text-xl font-semibold'>My Profile</h2>
				<p className='text-[#9B9B9B] text-sm font-medium'>
					Manage your profile information
				</p>
			</div>
			<div>
				<form className='space-y-12 py-8'>
					<div className='flex flex-col lg:flex-row gap-8 lg:gap-16 lg:items-start'>
						<div className='lg:flex-1 space-y-5'>{formUser}</div>
						<div className='lg:pl-16 lg:order-l border-l-[#D4D4D4]'>
							<UploadPhoto />
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
			className='block text-[#222222] px-[18px] py-3 border border-[#9B9B9B] rounded w-full max-w-[348px]'
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

function RadioGroup({ id, label, name }) {
	return (
		<div className='flex items-center gap-[10px]'>
			<Radio id={id} name={name} />
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

function UploadPhoto() {
	return (
		<div className='flex flex-col items-start lg:items-center gap-5'>
			<div className='w-[110px] aspect-square rounded-full overflow-hidden'>
				<img
					src={avatarImage}
					alt='Your Name'
					width={110}
					height={110}
					className='w-full h-full'
				/>
			</div>
			<div>
				<input
					className='peer w-[0.1px] h-[0.1px] opacity-0 overflow-hidden absolute -z-10'
					type='file'
					name='file'
					id='file'
					accept='image/*'
					required
				/>
				<label
					htmlFor='file'
					className='text-[#9B9B9B] text-sm font-medium py-2 px-6 border border-[#9B9B9B] rounded-full cursor-pointer'
				>
					Select image
				</label>
			</div>
		</div>
	);
}
