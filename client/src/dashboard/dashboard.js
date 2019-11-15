import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';


const CardComopnent = ({ title, count, color, id }) => (
    <Card style={{ margin: 20, height: 200, width: 300 }}>
        <CardHeader title={title} style={{ backgroundColor: color, textAlign: 'center' }} />
        <CardContent style={{ textAlign: "center", fontSize: 30 }}>{count}</CardContent>
        {id ? <CardContent style={{ textAlign: "center" }}>
            <a href={`https://admin.hakaya.news/#/posts/${id}`}> GoTo Post</a>
        </CardContent> : null}

    </Card>
);

let bgColor = ['#F06292', '#BA68C8', '#7986CB', '#4FC3F7', '#81C784', '#FFD54F', '#FF5722', '#607D8B', '#FF3D00'];
const RandomColor = () => bgColor[Math.floor(Math.random() * bgColor.length)];


export default () => {

    const [commentsCount, setcommentsCount] = useState(0);
    const [usersCount, setusersCount] = useState(0);
    const [postsCount, setpostsCount] = useState(0);
    const [reactionsCount, setreactionsCount] = useState(0);
    const [tagsCount, settagsCount] = useState(0);
    const [categoriesCount, setcategoriesCount] = useState(0);
    /* most */
    const [mostLiked, setmostLiked] = useState({});
    const [mostLoved, setmostLoved] = useState({});
    const [mostAngry, setmostAngry] = useState({});
    const [mostCommented, setmostCommented] = useState({});

    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    // let api = 'http://localhost:3001/posts/statistics';
    let api = 'https://api.hakaya.news/posts/statistics';
    useEffect(() => {
        fetch(api, config)
            .then(res => res.json())
            .then(({ commentsCount, usersCount, postsCount, reactionsCount, tagsCount, categoriesCount, mostLiked, mostLoved, mostAngry, mostCommented }) => {
                setcommentsCount(commentsCount);
                setusersCount(usersCount);
                setpostsCount(postsCount);;
                setreactionsCount(reactionsCount);
                settagsCount(tagsCount);
                setcategoriesCount(categoriesCount);
                /*most like , love .... */
                setmostLiked(mostLiked);
                setmostLoved(mostLoved);
                setmostAngry(mostAngry);
                setmostCommented(mostCommented);

            })
    }, [])

    return (
        <div style={{ display: 'flex', flexFlow: 'row wrap' }}>

            <CardComopnent title="Total Comments " count={commentsCount} color={RandomColor()} />
            <CardComopnent title="Total Posts " count={postsCount} color={RandomColor()} />
            <CardComopnent title="Total Reactions " count={reactionsCount} color={RandomColor()} />
            <CardComopnent title="Total Categories " count={categoriesCount} color={RandomColor()} />
            <CardComopnent title="Total Hash Tags " count={tagsCount} color={RandomColor()} />
            <CardComopnent title="Total Users " count={usersCount} color={RandomColor()} />

            {/* top reactions */}
            {mostLiked.count ? <CardComopnent title="Top Liked " count={mostLiked.count} color={RandomColor()} id={mostLiked.postId} /> : null}
            {mostLoved.count ? <CardComopnent title="Top Loved " count={mostLoved.count} color={RandomColor()} id={mostLoved.postId} /> : null}
            {mostAngry.count ? <CardComopnent title="Top Angry " count={mostAngry.count} color={RandomColor()} id={mostAngry.postId} /> : null}
            {mostCommented.count ? <CardComopnent title="Top Commented " count={mostCommented.count} color={RandomColor()} id={mostCommented.postId} /> : null}

        </div>
    )
};