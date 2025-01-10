import { gql } from "@apollo/client";

// have combined both getting site title and description with the about information.
// will probably do the same for subsequent queries. Will this make loading slower?
// Query for site settings
export const GET_SITE_SETTINGS = gql`
  query GetSiteSettings {
    generalSettings {
      title
      description
    }
  }
`;

// Query for the about page
export const GET_ABOUT_PAGE = gql`
  query GetAboutPage {
    page(id: "about", idType: URI) {
      title
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
      profilePicture {
        profilePicture {
          node {
            sourceUrl
            altText
            id
          }
        }
      }
    }
  }
`;
export const GET_PAGE_CAROUSEL_ITEMS = gql`
  query pageMedia($title: String = "") {
    mediaItems(where: { title: $title }) {
      edges {
        node {
          sourceUrl
        }
      }
    }
  }
`;
// Query for the CV page
export const GET_CV_PAGE = gql`
  query GetCVPage {
    page(id: "cv", idType: URI) {
      content
      title
    }
  }
`;

// Media items query, gets every item from the website
export const GET_ALL_MEDIA_ITEMS = gql`
  query GetMediaItems($first: Int, $after: String) {
    mediaItems(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        sourceUrl
        caption
      }
    }
  }
`;

// using this to get the image that Sepy will put on each individual page
export const GET_PAGE_IMAGE = gql`
  query GetMediaItemsByCaption($captionSearch: String!) {
    mediaItems(where: { search: $captionSearch }) {
      nodes {
        id
        sourceUrl
        caption
      }
    }
  }
`;

// Individual production page content query
export const GET_PAGE_CONTENT = gql`
  query GetPageContent($id: ID!) {
    page(id: $id, idType: URI, asPreview: true) {
      id
      content
      title
      uri
    }
  }
`;

export const GET_ALL_URIS = gql`
  query GetAllUris {
    pages {
      nodes {
        uri
      }
    }
  }
`;

export const GET_PAGE_IMAGE_AND_CONTENT = gql`
  query GetPageImageAndContent($id: ID!) {
    page(id: $id, idType: URI) {
      showInGallery {
        mainImage {
          node {
            sourceUrl
          }
        }
      }
      content
      title
    }
  }
`;

export const GET_PAGE_DATA_AND_CAROUSEL = gql`
  query GetPageDataAndCarousel($uri: String!, $title: String!) {
    page: page(id: $uri, idType: URI) {
      id
      content
      title
      uri
      showInGallery {
        mainImage {
          node {
            sourceUrl
          }
        }
      }
    }
    mediaItems(where: { title: $title }) {
      edges {
        node {
          sourceUrl
        }
      }
    }
  }
`;
