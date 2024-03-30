import './home.css'
import ButtonAppBar from '../../components/nav/navbar'
import Header1 from '../../components/header1/Header1'
import Featured from '../../components/featured/Featured'
import FeaturedProperties from '../../components/featuredProperties/FeaturedProperties'
import MailList from '../../components/mailList/MailList'
import Footer2 from '../../components/footer2/Footer2'

const Home = () => {
    return (
        <div>
            <ButtonAppBar/>
            <Header1></Header1>
            <div className="homeContainer">
                <Featured/>
                <h1 className='homeTitle'> Homes guests love</h1>
                <FeaturedProperties/>
                <MailList/>
            </div>
            <Footer2/>
        </div>
    )
}

export default Home