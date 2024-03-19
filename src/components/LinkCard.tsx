import { useEffect, useState } from 'react'

type LinkCardProps = {
	url: string
	title: string
	description: string
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
				<div className="flex flex-row items-center m-2 border border-gray-400 rounded-3xl max-md:flex-col max-md:gap-3">
					<img className="w-1/3 m-0 p-0 rounded-2xl max-md:w-full" src={ogpMap?.get('og:image')} />
					<div className="mx-2 p-0">
						<h4 className="text-gray-500 m-0 p-0 leading-none">{ogpMap.get('og:title')}</h4>
						<a className="text-base m-0 p-0 leading-none ">{ogpMap.get('og:url')}</a>
						<p className="text-sm text-gray-400 m-0 p-0 leading-none">{ogpMap.get('og:description')}</p>
					</div>
				</div>
			) : (
				<>
					<a>{url}</a>
				</>
			)}
		</>
	)
}

export default LinkCard

