import { createGlobalStyle } from 'styled-components'

const FulTechsStyle = createGlobalStyle`
#orderTable{
  .rdt_TableHeader{
    display:none !important
  }
}

.cursor-pointer{
  cursor: pointer !important;
}


table.list-table{
  tr{
    cursor:pointer;
    td{
        position: relative !important;
        .avatar{
            position: absolute;
        }
        span.text-value{
            display: inline-block;
            margin-left: 3em;
            padding: 0.3em 0;
        }
    }
  }
  th{
    position: relative;
    span{
      position: absolute;
      display: inline-block;
      margin-left: 8px;
      bottom: 5px;
    }
  }
}
form.search-form{
    .input-group-append{
        position: absolute;
        right: 10px;
        top: 0;
        z-index: 4;
        bottom: 0;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        pointer-events: none; 
        .feather-icon{
            display: block;
            color: #848d91 !important;
        }
    }
    .form-control{
        padding-left: 36px;
        border-radius: 50px;
        background: #fff;
    }
}

.header-reloading{
  font-size: 0.4em;
  right: -55px;
  bottom: 4px;
  position: absolute;
}

@keyframes rotating  {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.rotate {
  display:inline-block;
  animation: rotating 2s linear infinite;
}

.rdt_TableCell .text-center{
  width:100% !important;
  padding-right: 10px
}
`;

export default FulTechsStyle;