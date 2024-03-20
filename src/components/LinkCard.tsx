import { useEffect, useState } from 'react'

type LinkCardProps = {
	url: string
}

const LinkCard = (props: LinkCardProps) => {
	const { url } = props
	const [ogpMap, setOgpMap] = useState<Map<string, string>>()

	useEffect(() => {
		const fetchMetaData = (async () => {
			const response = await fetch(new URL(url))
			const html = await response.text()
			return new DOMParser().parseFromString(html, 'text/html')
		})()

		fetchMetaData.then((document) => {
			const map = new Map<string, string>()

			document.querySelector('head')?.querySelectorAll('meta').forEach((element) => {
				const property = element.attributes.getNamedItem('property')
				const content = element.attributes.getNamedItem('content')

				if (property && property.value.includes('og:') && content) {
					map.set(property.value, content.value)
				}
			})

			setOgpMap(map)
		}).catch((error) => {
			console.log('Failed to fetch head: ', error)
			return
		})

	}, [props])

	return (
		<>
			{ogpMap ? (
				<a
					className="flex flex-row items-center mx-2 my-8 border border-gray-400 rounded-lg max-md:flex-col max-md:gap-3"
					href={ogpMap.get('og:url')}>
					<img className="w-1/3 rounded max-md:w-full" src={ogpMap?.get('og:image')} />
					<div className="px-3 w-2/3 max-md:w-full max-md:mx-3">
						<p className="my-1 font-bold text-gray-500 leading-none">{ogpMap.get('og:title')}</p>
						<p
							className="text-gray-500 whitespace-nowrap overflow-hidden overflow-ellipsis leading-none ">{ogpMap.get('og:url')}</p>
						<p className="my-1 text-sm text-gray-400 leading-none">{ogpMap.get('og:description')}</p>
					</div>
				</a>
			) : (
				<>
					<a>{url}</a>
				</>
			)}
		</>
	)
}

export default LinkCard

