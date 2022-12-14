PGDMP                     
    z            APPTRIX    14.2    14.2     ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    43701    APPTRIX    DATABASE     f   CREATE DATABASE "APPTRIX" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Russian_Russia.1251';
    DROP DATABASE "APPTRIX";
                postgres    false            @           1247    43717    gender    TYPE     @   CREATE TYPE public.gender AS ENUM (
    'male',
    'female'
);
    DROP TYPE public.gender;
       public          postgres    false            ?            1255    43721    do_match(bigint, bigint)    FUNCTION     ?  CREATE FUNCTION public.do_match(arg_sender bigint, arg_receiver bigint, OUT user_email text) RETURNS text
    LANGUAGE plpgsql
    AS $$ 
    BEGIN 
        UPDATE public.user_match SET is_match=TRUE WHERE receiver=arg_sender and sender=arg_receiver; 

        user_email :='false';

        IF NOT FOUND THEN 
            INSERT INTO public.user_match (sender, receiver) 
                SELECT arg_sender, arg_receiver
                    WHERE NOT EXISTS (SELECT id FROM public.user_match WHERE sender=arg_sender AND receiver=arg_receiver);
        ELSE 
            user_email := (SELECT email FROM public.user WHERE id=arg_receiver);
        END IF; 

        RETURN;
    END; 
    $$;
 \   DROP FUNCTION public.do_match(arg_sender bigint, arg_receiver bigint, OUT user_email text);
       public          postgres    false            ?            1259    43703    user    TABLE     &  CREATE TABLE public."user" (
    id bigint NOT NULL,
    avatar character varying(32),
    first_name character varying(20),
    last_name character varying(30),
    email text,
    password character varying(32),
    gender character varying(6),
    latitude numeric,
    longitude numeric
);
    DROP TABLE public."user";
       public         heap    postgres    false            ?            1259    43702    user_id_seq    SEQUENCE     ?   ALTER TABLE public."user" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    210            ?            1259    43711 
   user_match    TABLE     ?   CREATE TABLE public.user_match (
    id bigint NOT NULL,
    sender bigint,
    receiver bigint,
    is_match boolean DEFAULT false
);
    DROP TABLE public.user_match;
       public         heap    postgres    false            ?            1259    43710    user_match_id_seq    SEQUENCE     ?   ALTER TABLE public.user_match ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_match_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    212            ?          0    43703    user 
   TABLE DATA           q   COPY public."user" (id, avatar, first_name, last_name, email, password, gender, latitude, longitude) FROM stdin;
    public          postgres    false    210          ?          0    43711 
   user_match 
   TABLE DATA           D   COPY public.user_match (id, sender, receiver, is_match) FROM stdin;
    public          postgres    false    212   ?       ?           0    0    user_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.user_id_seq', 43, true);
          public          postgres    false    209                        0    0    user_match_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.user_match_id_seq', 8, true);
          public          postgres    false    211            i           2606    43715    user_match user_match_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.user_match
    ADD CONSTRAINT user_match_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.user_match DROP CONSTRAINT user_match_pkey;
       public            postgres    false    212            g           2606    43709    user user_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public            postgres    false    210            ?   q  x????n?@?????	?s?>?"Ĳ??%Eȉǡ?@I??]H?ĲBB?A?K??7bl#?hۉ??&q?????|NL???N?XM??Ij[y????s[??q?Ȓ?[~D??x2?6?8NF??c;"??;?g??}w???7o݅??t?dj'#{?o?&?ꝗ??Ծ?'?R?o???$z#??Hj?$?????L(?Y?#??e!?Z?1Z[???.1?>??ɵ?r?WǴ?C3Lk3\???@Iem??1z?R?e<?Fk	Թ?=ё?ZWr????hơ?mѐ??9?D??AS9??E??9]?9??E??=??9=??}??-?W???EQ????9*nOl@?+??:j?{????^>??;??U?
)?B?Z1e?f?????#4?
????%?+???ȍ"bAC|v??]?}?k?˷?o߅??#?C?ϕ?,x??ҷ?F??TG?????O??X?s???i?J?A ?B3a$S?"tJ? ?z??i?N??}???z???σ???\?W??? A?}t??[y?Q?Y???M?????aŵ@C???D??AP??0??{??ӡ?	Q??Ƞ?ȉ??Ν???w??7?v?_?b???z39??(???ۚ      ?   ?   x???? Cѳ=?C?3d?9?'??@1??N$??B??=?˄?U\??6??q????     