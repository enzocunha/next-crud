'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

import Link from 'next/link';
import Title from '../components/Title';

export default function Form() {
	// Input fields
	const [bookData, setBookData] = useState({
		title: '',
		description: '',
		cover: '',
		author: {
			name: '',
			nationality: '',
		},
	});

	// Used to edit a book
	const searchParams = useSearchParams();
	const editId = searchParams.get('id');

	useEffect(() => {
		if (editId) {
			fetch(`/api/book/${editId}`)
				.then((response) => response.json())
				.then((data) => setBookData(data.data));
		}
	}, [editId]);

	// Used after form is submitted
	const router = useRouter();

	const handleSubmit = async (event) => {
		event.preventDefault();

		// If editId is set, update the book otherwise create a new one
		if (editId) {
			const response = await fetch(`/api/book/${editId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(bookData),
			});
		} else {
			const response = await fetch('/api/book', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(bookData),
			});
		}

		router.push('/');

		toast.success('Updated succesfully.', {
			position: 'top-center',
			autoClose: 2000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light',
		});
	};

	return (
		<div className='px-6 mb-12 sm:py-18 lg:px-8'>
			<Title title='Create a new book' />
			<form
				onSubmit={handleSubmit}
				method='POST'
				className='mx-auto max-w-xl'>
				<div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2'>
					{/* Book title */}
					<div className='sm:col-span-2'>
						<label
							htmlFor='title'
							className='block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-400'>
							Book title
						</label>
						<div className='mt-2.5'>
							<input
								onChange={(event) =>
									setBookData({
										...bookData,
										title: event.target.value,
									})
								}
								type='text'
								name='title'
								id='title'
								className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
								value={bookData.title || ''}
								required
							/>
						</div>
					</div>

					{/* Book description */}
					<div className='sm:col-span-2'>
						<label
							htmlFor='description'
							className='block text-sm font-semibold leading-6 text-gray-900  dark:text-gray-400'>
							Book description
						</label>
						<div className='mt-2.5'>
							<textarea
								onChange={(event) =>
									setBookData({
										...bookData,
										description: event.target.value,
									})
								}
								name='description'
								id='description'
								rows={4}
								className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 '
								value={bookData.description || ''}
								required
							/>
						</div>
					</div>

					{/* Book image source*/}
					<div className='sm:col-span-2'>
						<label
							htmlFor='image'
							className='block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-400'>
							Book image source
						</label>
						<div className='mt-2.5'>
							<input
								onChange={(event) =>
									setBookData({
										...bookData,
										cover: event.target.value,
									})
								}
								type='text'
								name='image'
								id='image'
								className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
								value={bookData.cover || ''}
							/>
						</div>
					</div>

					{/* Author Name */}
					<div className='sm:col-span-2'>
						<label
							htmlFor='authorName'
							className='block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-400'>
							Author name
						</label>
						<div className='mt-2.5'>
							<input
								onChange={(event) => {
									setBookData({
										...bookData,
										author: {
											...bookData.author,
											name: event.target.value,
										},
									});
								}}
								type='text'
								name='authorName'
								id='authorName'
								className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
								value={bookData.author.name}
								required
							/>
						</div>
					</div>

					{/* Author nationality */}
					<div className='sm:col-span-2'>
						<label
							htmlFor='authorNationality'
							className='block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-400'>
							Author nationality
						</label>
						<div className='relative mt-2.5'>
							<select
								onChange={(event) => {
									setBookData({
										...bookData,
										author: {
											...bookData.author,
											nationality: event.target.value,
										},
									});
								}}
								id='authorNationality'
								name='authorNationality'
								className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'>
								<option value={bookData.author.nationality}>
									{bookData.author.nationality ||
										'Select a nationality'}
								</option>
								<option value=''>-- select one --</option>
								<option value='afghan'>Afghan</option>
								<option value='albanian'>Albanian</option>
								<option value='algerian'>Algerian</option>
								<option value='american'>American</option>
								<option value='andorran'>Andorran</option>
								<option value='angolan'>Angolan</option>
								<option value='antiguans'>Antiguans</option>
								<option value='argentinean'>Argentinean</option>
								<option value='armenian'>Armenian</option>
								<option value='australian'>Australian</option>
								<option value='austrian'>Austrian</option>
								<option value='azerbaijani'>Azerbaijani</option>
								<option value='bahamian'>Bahamian</option>
								<option value='bahraini'>Bahraini</option>
								<option value='bangladeshi'>Bangladeshi</option>
								<option value='barbadian'>Barbadian</option>
								<option value='barbudans'>Barbudans</option>
								<option value='batswana'>Batswana</option>
								<option value='belarusian'>Belarusian</option>
								<option value='belgian'>Belgian</option>
								<option value='belizean'>Belizean</option>
								<option value='beninese'>Beninese</option>
								<option value='bhutanese'>Bhutanese</option>
								<option value='bolivian'>Bolivian</option>
								<option value='bosnian'>Bosnian</option>
								<option value='brazilian'>Brazilian</option>
								<option value='british'>British</option>
								<option value='bruneian'>Bruneian</option>
								<option value='bulgarian'>Bulgarian</option>
								<option value='burkinabe'>Burkinabe</option>
								<option value='burmese'>Burmese</option>
								<option value='burundian'>Burundian</option>
								<option value='cambodian'>Cambodian</option>
								<option value='cameroonian'>Cameroonian</option>
								<option value='canadian'>Canadian</option>
								<option value='cape verdean'>
									Cape Verdean
								</option>
								<option value='central african'>
									Central African
								</option>
								<option value='chadian'>Chadian</option>
								<option value='chilean'>Chilean</option>
								<option value='chinese'>Chinese</option>
								<option value='colombian'>Colombian</option>
								<option value='comoran'>Comoran</option>
								<option value='congolese'>Congolese</option>
								<option value='costa rican'>Costa Rican</option>
								<option value='croatian'>Croatian</option>
								<option value='cuban'>Cuban</option>
								<option value='cypriot'>Cypriot</option>
								<option value='czech'>Czech</option>
								<option value='danish'>Danish</option>
								<option value='djibouti'>Djibouti</option>
								<option value='dominican'>Dominican</option>
								<option value='dutch'>Dutch</option>
								<option value='east timorese'>
									East Timorese
								</option>
								<option value='ecuadorean'>Ecuadorean</option>
								<option value='egyptian'>Egyptian</option>
								<option value='emirian'>Emirian</option>
								<option value='equatorial guinean'>
									Equatorial Guinean
								</option>
								<option value='eritrean'>Eritrean</option>
								<option value='estonian'>Estonian</option>
								<option value='ethiopian'>Ethiopian</option>
								<option value='fijian'>Fijian</option>
								<option value='filipino'>Filipino</option>
								<option value='finnish'>Finnish</option>
								<option value='french'>French</option>
								<option value='gabonese'>Gabonese</option>
								<option value='gambian'>Gambian</option>
								<option value='georgian'>Georgian</option>
								<option value='german'>German</option>
								<option value='ghanaian'>Ghanaian</option>
								<option value='greek'>Greek</option>
								<option value='grenadian'>Grenadian</option>
								<option value='guatemalan'>Guatemalan</option>
								<option value='guinea-bissauan'>
									Guinea-Bissauan
								</option>
								<option value='guinean'>Guinean</option>
								<option value='guyanese'>Guyanese</option>
								<option value='haitian'>Haitian</option>
								<option value='herzegovinian'>
									Herzegovinian
								</option>
								<option value='honduran'>Honduran</option>
								<option value='hungarian'>Hungarian</option>
								<option value='icelander'>Icelander</option>
								<option value='indian'>Indian</option>
								<option value='indonesian'>Indonesian</option>
								<option value='iranian'>Iranian</option>
								<option value='iraqi'>Iraqi</option>
								<option value='irish'>Irish</option>
								<option value='israeli'>Israeli</option>
								<option value='italian'>Italian</option>
								<option value='ivorian'>Ivorian</option>
								<option value='jamaican'>Jamaican</option>
								<option value='japanese'>Japanese</option>
								<option value='jordanian'>Jordanian</option>
								<option value='kazakhstani'>Kazakhstani</option>
								<option value='kenyan'>Kenyan</option>
								<option value='kittian and nevisian'>
									Kittian and Nevisian
								</option>
								<option value='kuwaiti'>Kuwaiti</option>
								<option value='kyrgyz'>Kyrgyz</option>
								<option value='laotian'>Laotian</option>
								<option value='latvian'>Latvian</option>
								<option value='lebanese'>Lebanese</option>
								<option value='liberian'>Liberian</option>
								<option value='libyan'>Libyan</option>
								<option value='liechtensteiner'>
									Liechtensteiner
								</option>
								<option value='lithuanian'>Lithuanian</option>
								<option value='luxembourger'>
									Luxembourger
								</option>
								<option value='macedonian'>Macedonian</option>
								<option value='malagasy'>Malagasy</option>
								<option value='malawian'>Malawian</option>
								<option value='malaysian'>Malaysian</option>
								<option value='maldivan'>Maldivan</option>
								<option value='malian'>Malian</option>
								<option value='maltese'>Maltese</option>
								<option value='marshallese'>Marshallese</option>
								<option value='mauritanian'>Mauritanian</option>
								<option value='mauritian'>Mauritian</option>
								<option value='mexican'>Mexican</option>
								<option value='micronesian'>Micronesian</option>
								<option value='moldovan'>Moldovan</option>
								<option value='monacan'>Monacan</option>
								<option value='mongolian'>Mongolian</option>
								<option value='moroccan'>Moroccan</option>
								<option value='mosotho'>Mosotho</option>
								<option value='motswana'>Motswana</option>
								<option value='mozambican'>Mozambican</option>
								<option value='namibian'>Namibian</option>
								<option value='nauruan'>Nauruan</option>
								<option value='nepalese'>Nepalese</option>
								<option value='new zealander'>
									New Zealander
								</option>
								<option value='ni-vanuatu'>Ni-Vanuatu</option>
								<option value='nicaraguan'>Nicaraguan</option>
								<option value='nigerien'>Nigerien</option>
								<option value='north korean'>
									North Korean
								</option>
								<option value='northern irish'>
									Northern Irish
								</option>
								<option value='norwegian'>Norwegian</option>
								<option value='omani'>Omani</option>
								<option value='pakistani'>Pakistani</option>
								<option value='palauan'>Palauan</option>
								<option value='panamanian'>Panamanian</option>
								<option value='papua new guinean'>
									Papua New Guinean
								</option>
								<option value='paraguayan'>Paraguayan</option>
								<option value='peruvian'>Peruvian</option>
								<option value='polish'>Polish</option>
								<option value='portuguese'>Portuguese</option>
								<option value='qatari'>Qatari</option>
								<option value='romanian'>Romanian</option>
								<option value='russian'>Russian</option>
								<option value='rwandan'>Rwandan</option>
								<option value='saint lucian'>
									Saint Lucian
								</option>
								<option value='salvadoran'>Salvadoran</option>
								<option value='samoan'>Samoan</option>
								<option value='san marinese'>
									San Marinese
								</option>
								<option value='sao tomean'>Sao Tomean</option>
								<option value='saudi'>Saudi</option>
								<option value='scottish'>Scottish</option>
								<option value='senegalese'>Senegalese</option>
								<option value='serbian'>Serbian</option>
								<option value='seychellois'>Seychellois</option>
								<option value='sierra leonean'>
									Sierra Leonean
								</option>
								<option value='singaporean'>Singaporean</option>
								<option value='slovakian'>Slovakian</option>
								<option value='slovenian'>Slovenian</option>
								<option value='solomon islander'>
									Solomon Islander
								</option>
								<option value='somali'>Somali</option>
								<option value='south african'>
									South African
								</option>
								<option value='south korean'>
									South Korean
								</option>
								<option value='spanish'>Spanish</option>
								<option value='sri lankan'>Sri Lankan</option>
								<option value='sudanese'>Sudanese</option>
								<option value='surinamer'>Surinamer</option>
								<option value='swazi'>Swazi</option>
								<option value='swedish'>Swedish</option>
								<option value='swiss'>Swiss</option>
								<option value='syrian'>Syrian</option>
								<option value='taiwanese'>Taiwanese</option>
								<option value='tajik'>Tajik</option>
								<option value='tanzanian'>Tanzanian</option>
								<option value='thai'>Thai</option>
								<option value='togolese'>Togolese</option>
								<option value='tongan'>Tongan</option>
								<option value='trinidadian or tobagonian'>
									Trinidadian or Tobagonian
								</option>
								<option value='tunisian'>Tunisian</option>
								<option value='turkish'>Turkish</option>
								<option value='tuvaluan'>Tuvaluan</option>
								<option value='ugandan'>Ugandan</option>
								<option value='ukrainian'>Ukrainian</option>
								<option value='uruguayan'>Uruguayan</option>
								<option value='uzbekistani'>Uzbekistani</option>
								<option value='venezuelan'>Venezuelan</option>
								<option value='vietnamese'>Vietnamese</option>
								<option value='welsh'>Welsh</option>
								<option value='yemenite'>Yemenite</option>
								<option value='zambian'>Zambian</option>
								<option value='zimbabwean'>Zimbabwean</option>
							</select>
						</div>
					</div>

					{/* Go back button */}
					<Link
						href='/'
						className='mt-5 rounded-md bg-green-500 hover:bg-green-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
						Cancel
					</Link>

					{/* Submit button */}
					<button
						type='submit'
						className='mt-5 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
						{editId ? 'Update book' : 'Create book'}
					</button>
				</div>
			</form>
		</div>
	);
}
