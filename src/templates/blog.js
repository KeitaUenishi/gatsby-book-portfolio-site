import * as React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo" 
import Pagination from "../components/pagination"  
import * as style from "../styles/blog.module.scss"  

const Blog = ({ data, pageContext }) => {
    return (
        <Layout>
            <Seo title="ブログ" description="これはブログページです" /> 
            <div className={style.wrapper}>
                <div className={style.container}>
                    <h1>Blog</h1>
                    <p>エンジニアの日常生活をお届けします</p>
                        {data.allMarkdownRemark.edges.map((singleBlog, index) => {
                            const { title, date, excerpt, image } = singleBlog.node.frontmatter
                            const { slug } = singleBlog.node.fields
                            const img = getImage(image.childImageSharp.gatsbyImageData)
                            return (
                                <div className={style.blogCard} key={index}>                            
                                    <div className={style.textContainer}>
                                        <h3>{title}</h3>
                                        <p>{excerpt}</p>
                                        <p>{date}</p>
                                        <Link to={`/blog${slug}`}>Read More</Link> 
                                    </div>
                                    <GatsbyImage image={img} alt="card-image" className={style.cardImg} />
                                </div>
                            )}
                        )}
                </div>
                <Pagination pageContext={pageContext} /> 
            </div>
        </Layout> 
    )
}

export default Blog

export const query = graphql`
    query BlogQuery ($skip: Int!, $limit: Int!) { 
        allMarkdownRemark(
            sort: {fields: frontmatter___id, order: DESC}
            limit: $limit      
            skip: $skip  
        ) {
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        date
                        excerpt
                        id
                        image {
                            childImageSharp {
                                gatsbyImageData(
                                    quality: 90, 
                                    formats: [AUTO, WEBP, AVIF], 
                                    placeholder: BLURRED, 
                                )
                            }
                        }
                        title
                    }
                }
            }
        }
    }
`