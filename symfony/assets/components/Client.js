import React from 'react';
import { useParams } from "react-router-dom";

const Client = () => {
      const { slug } = useParams();

      return (
            <>
                  Client component. slugId: {slug}
            </>
      );
};

export default Client;
