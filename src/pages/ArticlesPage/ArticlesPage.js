import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import { Loader } from '../../components/Loader/Loader';
import './ArticlesPage.scss';

export const ArticlesPage = ({articles}) => (
	<div className="articles">
		{articles === [] ? (
			<Loader/>
		): (
			<div className='articles-content'>
				{articles.slice(0, -8).map(({display_title, summary_short, multimedia:{src}, link:{url}}, index) => (
					<Card sx={{ maxWidth: 400 }}  key={index} className='card-article'>
					<CardActionArea>
						<CardMedia
							component="img"
							height="200"
							image={src}
							alt="article image"
						/>
						<CardContent>
							<Typography gutterBottom variant="h4" component="div" className='card-article__title'>
								<a href={url} target='_blank' rel='noreferrer'>{display_title}</a>
							</Typography>
							<Typography variant="body" color="text.secondary" height="50" className='card-article__description'>{summary_short}</Typography>
						</CardContent>
					</CardActionArea>
					</Card>
				))}
			</div>
		)}
	</div>
)