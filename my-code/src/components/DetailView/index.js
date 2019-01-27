import React from 'react'
import styled from 'styled-components'
import { useFetch } from 'react-hooks-fetch'
import { useUrlState } from 'with-url-state'
import Container from 'components/Container'
import { Arrow } from 'components/Icon'
import { Row, Cell } from 'components/Grid'
import Text from 'components/Text'
import Meta from './Meta'
import Section from './Section'


const Wrapper = styled.div`
	flex: 1
	display: flex;
	flex-direction: column;
	transition: 0.2s all;
`

const ArrowWrapper = styled.div`
	color: ${p => p.theme.colors.lightGrey};
	cursor: pointer;
	display: block;
	&:hover{
		color: ${p => p.theme.colors.white};
	}
`


const DetailView = () => {
	const [urlState, setUrlState] = useUrlState()

	const { error, loading, data } = useFetch([
		`https://api.themoviedb.org/3/movie/${urlState.id}`,
		`?api_key=${process.env.REACT_APP_TMDB_KEY}`,
		`&append_to_response=release_dates`
	].join(''))

	return(
		<Wrapper>
			<Container>
				<ArrowWrapper onClick={() => setUrlState({index: 1})}>
					<Arrow/>
				</ArrowWrapper>
				{!loading && data && (
					<Row>
						<Cell lg={6}>
							<Meta {...data}/>
							<Text weight={600} xs={2} sm={3} md={4} xg={5}>
								{data.title}
							</Text>
							<Row>
								<Cell lg={10}>
									<Section title='Plot'>{data.overview}</Section>
								</Cell>
							</Row>
							<Row>
								<Cell>
									<Section title='Genres'>
										{data.genres.map(x => <div>{x.name}</div>)}
									</Section>
								</Cell>
							</Row>
							{/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
						</Cell>
					</Row>
				)}
			</Container>
			{error && <div>error</div>}
		</Wrapper>
	)
}

export default DetailView
