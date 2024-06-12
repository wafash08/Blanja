import { useRef } from 'react';

export default function AddressPage() {
	const refDialog = useRef(null);

	const handleOpenDialog = () => {
		refDialog.current?.showModal();
	};

	const handleCloseDialog = () => {
		refDialog.current?.close();
	};

	return (
		<section className='bg-white border border-[#9B9B9B] rounded p-7 max-w-[850px] min-h-screen'>
			<div className='border-b border-b-[#D4D4D4] space-y-[6px] pb-4'>
				<h2 className='text-[#222222] text-xl font-semibold'>
					Choose another address
				</h2>
				<p className='text-[#9B9B9B] text-sm font-medium'>
					Manage your shipping address
				</p>
			</div>

			<div className='space-y-8 pt-8'>
				<div>
					<button
						type='button'
						className='group text-[#9B9B9B] relative w-full max-w-[710px] mx-auto py-8 px-14 flex items-center justify-center'
						onClick={handleOpenDialog}
					>
						<span className='text-lg font-semibold transition-colors group-hover:text-[#222]'>
							Add new Address
						</span>
						<svg
							viewBox='0 0 710 86'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							aria-hidden
							className='absolute top-0 left-0 w-full h-full pointer-events-none'
						>
							<rect
								x='0.5'
								y='0.5'
								width='709'
								height='85'
								rx='7.5'
								stroke='currentColor'
								stroke-dasharray='6 6'
								className='transition-colors group-hover:text-[#222]'
							/>
						</svg>
					</button>

					<dialog
						className='font-metropolis backdrop:bg-black/40 w-full max-w-3xl border border-[#9B9B9B] bg-white rounded-lg relative p-10'
						ref={refDialog}
					>
						<div className='mb-10'>
							<h2 className='text-[#222222] text-[28px] text-center'>
								Add new address
							</h2>
						</div>
						<form className='space-y-12'>
							<div className='space-y-4'>
								<FormControl>
									<Label id='detail_address'>Save address as</Label>
									<Input
										type='text'
										name='detail_address'
										id='detail_address'
										placeholder='Ex: Rumah'
									/>
								</FormControl>
								<div className='flex items-center gap-8'>
									<div className='flex-1'>
										<FormControl>
											<Label id='name'>Recipient’s name</Label>
											<Input
												type='text'
												name='name'
												id='name'
												placeholder='Ex: Andri'
											/>
										</FormControl>
									</div>
									<div className='flex-1'>
										<FormControl>
											<Label id='phone'>Recipient's telephone number</Label>
											<Input
												type='tel'
												name='phone'
												id='phone'
												placeholder='Ex: 0812xxxxxxxx'
											/>
										</FormControl>
									</div>
								</div>
								<div className='flex items-center gap-8'>
									<div className='flex-1'>
										<FormControl>
											<Label id='main_address'>Address</Label>
											<Input
												type='text'
												name='main_address'
												id='main_address'
												placeholder='Ex: Jl. Imam Bonjol'
											/>
										</FormControl>
									</div>
									<div className='flex-1'>
										<FormControl>
											<Label id='postal_code'>Postal Code</Label>
											<Input
												type='text'
												name='postal_code'
												id='postal_code'
												placeholder='Ex: 15890'
											/>
										</FormControl>
									</div>
								</div>
								<div className='flex items-center gap-8'>
									<div className='flex-1'>
										<FormControl>
											<Label id='city'>City or Subdistrict</Label>
											<Input
												type='text'
												name='city'
												id='city'
												placeholder='Ex: Jakarta'
											/>
										</FormControl>
									</div>
									<div className='flex-1' />
								</div>
							</div>

							<div className='flex justify-end'>
								<button type='button' className='text-[#9B9B9B]'>
									Cancel
								</button>
								<button type='submit' className='text-[#9B9B9B]'>
									Save
								</button>
							</div>
						</form>
						<button
							type='button'
							onClick={handleCloseDialog}
							className='absolute top-4 right-4'
						>
							Tutup
						</button>
					</dialog>
				</div>

				<ul>
					<li>address 1</li>
					<li>address 2</li>
					<li>address 3</li>
				</ul>
			</div>
		</section>
	);
}

function FormControl({ children }) {
	return <div className='flex flex-col gap-3'>{children}</div>;
}

function Label({ children, id }) {
	return (
		<label htmlFor={id} className='text-[#9B9B9B] text-sm font-medium'>
			{children}
		</label>
	);
}

function Input({ ...props }) {
	return (
		<input
			{...props}
			className='py-3 px-5 w-full border border-[#9B9B9B] shadow-[0_1px_8px_0px_#0000000D] rounded'
		/>
	);
}
