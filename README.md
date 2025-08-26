## Flex Living Dashboard

A modern **property performance and guest feedback dashboard** built with **Next.js, React, TypeScript, and Material-UI**.  
This project visualizes property performance, integrates mock guest reviews, and provides a polished UI for exploring insights.  

##  Overview

The **Flex Living Reviews Dashboard** is a tool designed to help property managers evaluate and showcase guest feedback across all properties. By centralizing reviews in a clean, interactive dashboard, managers can quickly identify trends, spot recurring issues, and make informed decisions to improve guest experiences.

Since the official Hostaway Reviews API is sandboxed and does not provide live data, the system uses **mocked JSON reviews** that simulate real-world scenarios. Reviews can be filtered, sorted, and moderated to ensure only the best feedback is displayed on the Flex Living website.

On the guest-facing side, approved reviews are elegantly displayed in a **modern review carousel**, styled to match the Flex Living property details layout. This creates a trustworthy and engaging way for potential guests to see authentic feedback before booking.


##  Features

### 1. Hostaway Integration (Mocked)
-  Simulated integration with the **Hostaway Reviews API**.  
- Uses **mock JSON data** to represent realistic reviews.  
- Normalizes reviews by:
  - Listing  
  - Review type (public/private)  
  - Date  

### 2. Manager Dashboard
-  **Property Performance Overview**
  - View how each property is performing based on guest reviews.  
  - Summarized insights for managers to act on.  

-  **Filtering & Sorting**
  - Filter reviews by rating, category, channel, or time period.  
  - Spot recurring issues or trends quickly.  

-  **Review Moderation**
  - Managers can select which reviews should be displayed publicly.  
  - Approval state is saved in **localStorage**.  

-  **Modern UI**
  - Built with **Next.js + Material-UI**.  
  - Responsive, clean, and manager-friendly interface.  

### 3. Review Display Page
-  **Website-style Review Section**
  - Replicates the Flex Living property details layout.  
  - Adds a **dedicated guest reviews section**.  
  - Only **approved reviews** are shown here.  

-  **Ratings Visualization**
  - Always shows **10 stars** per review.  
  - Filled vs. faded stars depending on rating.  
  - If rating is `N/A`, all stars are faded.  

-  **Polished Review Cards**
  - Decorative **quote icon** above each card.  
  - Circle avatar with **Person icon**.  
  - Guest name, property name, review text, and categories displayed.  

---


##  Tech Stack

- [Next.js 14](https://nextjs.org/) — React framework with App Router
- [React](https://reactjs.org/) — Component-based UI
- [TypeScript](https://www.typescriptlang.org/) — Type-safe code
- [Material-UI (MUI)](https://mui.com/) — UI components and styling
- [JSON Mock Data] — Guest reviews stored locally in `src/data/mockReviews.json`

---

##  Project Structure
```
.
├── public/
│ └── images/ # Static images (e.g. dashboard illustration)
├── src/
│ ├── app/
│ │ ├── page.tsx # Landing page
│ │ └── properties/page.tsx # Client reviews carousel
│ ├── components/ # Reusable UI components (if added)
│ ├── data/
│ │ └── mockReviews.json # Mock guest reviews data
│ └── styles/ # Global styles (if extended)
├── package.json # Dependencies and scripts
└── README.md # Project documentation
```

##  Installation & Setup

Clone the repository:

```bash
git clone https://github.com/samwanyua/flex-living-dashboard.git
cd flex-living-dashboard
```

Install dependencies:
```
npm install
```


Run the development server:
```
npm run dev
```


The app should now be running on http://localhost:3000

## Mock Reviews Data
```
{
  "status": "success",
  "result": [
    {
      "id": 7453,
      "type": "host-to-guest",
      "status": "published",
      "rating": null,
      "publicReview": "Shane and family are wonderful! Would definitely host again :)",
      "reviewCategory": [
        {
          "category": "cleanliness",
          "rating": 10
        },
        {
          "category": "communication",
          "rating": 10
        },
        {
          "category": "respect_house_rules",
          "rating": 10
        }
      ],
      "submittedAt": "2020-08-21 22:45:14",
      "guestName": "Shane Finkelstein",
      "listingName": "2B N1 A - 29 Shoreditch Heights"
    }
  ]
}
```

## Google Reviews Integration (Challenges)

While attempting to integrate **Google Places API** to fetch Google Reviews for properties, we encountered some limitations and issues:

1. **API Key Restrictions**  
   - When using the API from the frontend, we received the error:  
     ```
     {
       "error_message": "API keys with referer restrictions cannot be used with this API.",
       "status": "REQUEST_DENIED"
     }
     ```
   - This occurs because the **Places Details API** requires either unrestricted keys or secure backend requests, while frontend keys often have referer restrictions (for security).

2. **CORS & Security Limitations**  
   - Calling the Google Places API directly from the frontend (`"use client"`) leads to CORS issues and exposes the API key, which is unsafe.  
   - To mitigate this, we first attempted to create a **server-side API route** (`/api/reviews/google`) as a proxy, which works but still inherits restrictions if the key is not properly configured.

3. **Current State**  
   - We set up a placeholder integration where reviews are **fetched via a server route** (`/api/reviews/google`).  
   - If reviews cannot be retrieved (due to API restrictions or missing data), the UI falls back to a **graceful card message**:  
     ```tsx
     <Card sx={{ p: 4, textAlign: "center" }}>
       <Typography variant="h6">No Google reviews found.</Typography>
     </Card>
     ```

4. **Next Steps / Possible Workarounds**  
   - Use a **server-side only API key** (restricted by IP instead of referer).  
   - Explore **Google My Business API** (for business-managed reviews) as an alternative.  
   - Document findings as part of transparency for future development.

✅ This ensures the dashboard doesn’t break even if Google Reviews are not accessible, while leaving room for improvement once API key restrictions are resolved.
